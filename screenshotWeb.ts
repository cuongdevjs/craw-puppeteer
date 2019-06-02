const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto("https://wwww.facebook.com");
  await page.screenshot({ path: "facebook.jpg" });
  await page.pdf({ path: "name.pdf", format: "A4" });

  await page.close();
  await browser.close();
}

main();
