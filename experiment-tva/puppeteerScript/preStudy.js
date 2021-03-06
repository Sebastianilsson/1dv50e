const puppeteer = require("puppeteer");
const fs = require("fs");

const nosql = "http://localhost:3000/#/";
const aws = "http://localhost:3001/#/";
const firebase = "http://localhost:3002/#/";
let services = [nosql, aws, firebase];

let nosqlResult = [];
let awsResult = [];
let firebaseResult = [];

const twentyFourHours = 1000 * 60 * 60 * 24;
let invocations = 0;

const startTime = Date.now();

(() => {
  let timer = setInterval(async () => {
    invocations++;
    services = shuffleArray(services);
    services.forEach(async (service) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const client = await page.target().createCDPSession();
      await client.send("Network.emulateNetworkConditions", {
        offline: false,
        downloadThroughput: 9306112, // 71 Mbit/s
        uploadThroughput: 655360, // 5 Mbit/s
        latency: 0,
      });

      await page.goto(service);

      await page.waitForNavigation();

      let times = await page.evaluate(() => {
        const times = {
          timestamp: timestamp,
          firstRender: firstRender.toFixed(0),
          loginClick: loginClick.toFixed(0),
          callToLogin: callToLogin.toFixed(0),
          loginDone: loginDone.toFixed(0),
          privatePageRendered: privatePageRendered.toFixed(0),
        };
        delete window.timestamp;
        delete window.firstRender;
        delete window.loginClick;
        delete window.callToLogin;
        delete window.loginDone;
        delete window.privatePageRendered;
        return times;
      });
      pushToResultArrayAndIncreaseInvocationCount(times, service);

      await browser.close();
    });

    if (Date.now() - startTime >= twentyFourHours) {
      console.log(Date.now() - startTime);
      clearInterval(timer);
      setTimeout(async () => {
        await writeResultsToJsonFiles();
      }, 20000);
    }

    if (invocations % 100 === 0) writeResultsToJsonFiles();
  }, 30000);
})();

const shuffleArray = (array) => {
  let i = array.length,
    k,
    temp;
  while (--i > 0) {
    k = Math.floor(Math.random() * (i + 1));
    temp = array[k];
    array[k] = array[i];
    array[i] = temp;
  }
  return array;
};

const pushToResultArrayAndIncreaseInvocationCount = (times, service) => {
  if (service === "http://localhost:3000/#/") {
    nosqlResult.push(times);
  } else if (service === "http://localhost:3001/#/") {
    awsResult.push(times);
  } else if (service === "http://localhost:3002/#/") {
    firebaseResult.push(times);
  }
};

const writeResultsToJsonFiles = () => {
  let nosqlJson = JSON.stringify(nosqlResult);
  let awsJson = JSON.stringify(awsResult);
  let firebaseJson = JSON.stringify(firebaseResult);
  // Add new result -> json for every new solution

  fs.appendFile(`./nosql/nosqlPreStudy.json`, nosqlJson, (e) => {
    if (e) throw e;
  });

  fs.appendFile(`./aws/awsPreStudy.json`, awsJson, (e) => {
    if (e) throw e;
  });

  fs.appendFile(`./firebase/firebasePreStudy.json`, firebaseJson, (e) => {
    if (e) throw e;
  });
  // Add new write result to file for every new solution

  nosqlResult = [];
  awsResult = [];
  firebaseResult = [];

  console.log("data is written to files");
};
