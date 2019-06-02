const puppeteer = require("puppeteer");
const fs = require("fs");
const download = require("image-downloader");

async function main() {
  // launch the browser
  const browser = await puppeteer.launch({
    headless: true // headless or non-headless
  });
  // open a new tab
  const page = await browser.newPage();

  // url endpoint
  await page.goto("https://www.instagram.com/apple/", {
    waitUntil: "networkidle2"
  });

  // get list image (lazy load => 24 image)
  const listSrcs = await page.evaluate(() => {
    let listElement = Array.from(document.querySelectorAll("div.KL4Bh > img"));
    let listSrcImages = listElement.map(item => {
      return item.getAttribute("src");
    });
    return listSrcImages;
  });

  // close tab and browser
  await page.close();
  await browser.close();

  // check directory existed, if not, create new folder
  const pathContainerFolder = "./images";
  if (!fs.existsSync(pathContainerFolder)) {
    fs.mkdirSync(pathContainerFolder);
  }

  // download image
  listSrcs.forEach(element => {
    download({
      url: element,
      dest: pathContainerFolder
    });
  });
}

main();
