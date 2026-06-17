const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/ebenrabiaa/Desktop/partners_full.png", fullPage: true });
  await browser.close();
  console.log("Done");
})().catch(e => { console.error(e.message); process.exit(1); });
