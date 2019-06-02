const puppeteer = require("puppeteer");

(async () => {
  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();

  try {
    await page.goto("https://www.24h.com.vn/bong-da-c48.html");
    let listUrls = await page.evaluate(() => {
      let arrNode = Array.from(document.querySelectorAll("article > a"));
      let arr = arrNode.map(node => {
        return {
          path: node.getAttribute("href"),
          title: node.innerHTML
        };
      });
      return arr;
    });
    console.log(listUrls);
  } catch (err) {
    console.log(err);
  } finally {
    await page.close();
    await browser.close();
  }
})();
