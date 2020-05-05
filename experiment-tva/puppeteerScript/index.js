const puppeteer = require("puppeteer");
const fs = require("fs");
const jsonFileNames = ["baseResult.json", "firebaseResult.json"];
let services = [
  "http://localhost:3001/#/",
  "http://localhost:3002/#/",
  "http://localhost:3003/#/",
]; // Add new URL for every new solution
let invocations = [0, 0, 0]; // Add new item for every new solution
let nrOfInvocationsPerService = 2;
const nrOfLoops = nrOfInvocationsPerService * services.length;
let activeService;
let baseResult = [];
let firebaseResult = [];
let awsResult = [];
// Add new result array for every new solution

(async () => {
  for (let index = 0; index < nrOfLoops; index++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await goToRandomService(page);

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
  console.log(randomValue);
  activeService = services[randomValue];
  console.log(activeService);
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
  } else if (activeService === "http://localhost:3003/#/") {
    serviceIndex = 2;
    awsResult.push(times);
  } // Add new else if for every new solution
  invocations[serviceIndex]++;
  if (invocations[serviceIndex] >= nrOfInvocationsPerService)
    services.splice(services.indexOf(activeService), 1);
  console.log(invocations, services);
};

const writeResultsToJsonFiles = () => {
  let baseJson = JSON.stringify(baseResult);
  let firebaseJson = JSON.stringify(firebaseResult);
  let awsJson = JSON.stringify(awsResult);
  // Add new result -> json for every new solution

  fs.writeFile("./base/baseResult.json", baseJson, (e) => {
    if (e) throw e;
  });

  fs.writeFile("./firebase/firebaseResult.json", firebaseJson, (e) => {
    if (e) throw e;
  });

  fs.writeFile("./aws/awsResult.json", awsJson, (e) => {
    if (e) throw e;
  });
  // Add new write result to file for every new solution
};
