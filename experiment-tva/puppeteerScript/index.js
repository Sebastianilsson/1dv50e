const puppeteer = require("puppeteer");
const fs = require("fs");
const jsonFileNames = ["baseResult.json", "firebaseResult.json"];
let services = ["http://localhost:3001/#/", "http://localhost:3002/#/"];
let nrOfInvocations = [0, 0];
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

    pushToResultArray(times);

    await browser.close();
  }

  writeResultsToJsonFiles();
})();

const goToRandomService = (page) => {
  let randomValue = Math.floor(Math.random() * Math.floor(services.length));
  nrOfInvocations[randomValue]++;
  activeService = services[randomValue];
  if (nrOfInvocations[randomValue] >= 2) services.splice(randomValue, 1);
  console.log(nrOfInvocations);
  return page.goto(activeService);
};

const pushToResultArray = (times) => {
  if (activeService === "http://localhost:3001/#/") baseResult.push(times);
  if (activeService === "http://localhost:3002/#/") firebaseResult.push(times);
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
