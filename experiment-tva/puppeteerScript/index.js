const puppeteer = require("puppeteer");
const fs = require("fs");
const jsonFileNames = ["baseResult.json", "firebaseResult.json"];
let services = ["http://localhost:3001/#/", "http://localhost:3002/#/"];
let invocations = [0, 0];
let nrOfInvocationsPerService = 2;
let activeService;
let baseResult = [];
let firebaseResult = [];

(async () => {
  for (let index = 0; index < 4; index++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await goToRandomService(page);

    await page.type("#basic_email", "test@test.se");
    await page.type("#basic_password", "testtest");

    const firstRender = await page.evaluate("firstRender");
    console.log(firstRender);

    await page.waitForNavigation();

    let times = await page.evaluate(() => {
      return {
        firstRender: firstRender.toFixed(0),
        loginClick: loginClick.toFixed(0),
        callToLogin: callToLogin.toFixed(0),
        loginDone: loginDone.toFixed(0),
        privatePageRendered: privatePageRendered.toFixed(0),
      };
    });

    pushToResultArrayAndIncreaseInvocationCount(times);

    await browser.close();
  }

  writeResultsToJsonFiles();
})();

const goToRandomService = (page) => {
  let randomValue = Math.floor(Math.random() * Math.floor(services.length));
  activeService = services[randomValue];
  return page.goto(activeService);
};

const pushToResultArrayAndIncreaseInvocationCount = (times) => {
  let serviceIndex;
  if (activeService === "http://localhost:3001/#/") {
    serviceIndex = 0;
    baseResult.push(times);
  } else if (activeService === "http://localhost:3002/#/") {
    serviceIndex = 1;
    firebaseResult.push(times);
  }
  invocations[serviceIndex]++;
  if (invocations[serviceIndex] >= nrOfInvocationsPerService)
    services.splice(services.indexOf(activeService), 1);
  console.log(invocations, services);
};

const writeResultsToJsonFiles = () => {
  let baseJson = JSON.stringify(baseResult);
  let firebaseJson = JSON.stringify(firebaseResult);

  fs.writeFile("baseResult.json", baseJson, (e) => {
    if (e) throw e;
  });

  fs.writeFile("firebaseResult.json", firebaseJson, (e) => {
    if (e) throw e;
  });
};
