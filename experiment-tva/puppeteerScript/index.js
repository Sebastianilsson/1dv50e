const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://localhost:3001/#/");

  await page.type("#basic_email", "test@test.se");
  await page.type("#basic_password", "testtest");

  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click("#submitButton"),
  ]);

  await page.screenshot({ path: "example.png" });

  console.log("Login performed!");

  await browser.close();
})();