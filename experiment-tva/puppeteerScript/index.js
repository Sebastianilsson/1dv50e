const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  let result = [];
  for (let index = 0; index < 3; index++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3001/#/");

    await page.type("#basic_email", "test@test.se");
    await page.type("#basic_password", "testtest");

    const firstRender = await page.evaluate("firstRender");
    console.log(firstRender);

    const [response] = await Promise.all([
      // page.click("#submitButton"),
      page.waitForNavigation(),
    ]);

    let times = await page.evaluate(() => {
      return {
        firstRender: firstRender.toFixed(0),
        loginClick: loginClick.toFixed(0),
        callToLogin: callToLogin.toFixed(0),
        loginDone: loginDone.toFixed(0),
        privatePageRendered: privatePageRendered.toFixed(0),
      };
    });

    result.push(times);

    await browser.close();
  }

  let json = JSON.stringify(result);

  fs.writeFile("result.json", json, (e) => {
    if (e) throw e;
    console.log("Done");
  });
})();
