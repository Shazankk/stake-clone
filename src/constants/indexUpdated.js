/* eslint-disable no-undef */
const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const path = require("path");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // Disable sandboxing for root user
  });
  const page = await browser.newPage();

  await page.goto("https://www.bigfoltz.com/leaderboards");
  await page.waitForSelector('p[class*="top-player-wagered-text"]');
  const scrapedData = await page.evaluate(() => {
    function currToNum(str) {
      return parseFloat(str.replace(/[^0-9.-]+/g, ""));
    }
    function dedupeArray(arr, keyFn) {
      const seen = new Set();
      return arr.filter((item) => {
        const key = keyFn(item);
        if (!seen.has(key)) {
          seen.add(key);
          return true;
        }
        return false;
      });
    }

    const playerDivs = document.querySelectorAll("div.flex");

    const top = dedupeArray(
      Array.from(playerDivs)
        .map((playerDiv) => {
          const title = playerDiv
            .querySelector(".top-player-title")
            ?.textContent?.replace(/^#\d+\s*/, "")
            .trim();
          const wageredText = playerDiv
            .querySelector(".top-player-wagered-text")
            ?.textContent?.trim();
          const wageredValue = playerDiv
            .querySelector(".top-player-wagered-value")
            ?.textContent?.trim();
          const price = playerDiv
            .querySelector(".top-player-button")
            ?.textContent?.trim();

          if (wageredText && wageredValue) {
            return {
              user: title,
              wagered: currToNum(wageredValue),
              price: currToNum(price),
            };
          }
          return null;
        })
        .filter(Boolean),
      (item) => `${item.user}-${item.wagered}-${item.price}`
    );

    const tableRows = document.querySelectorAll("table.leaderboard tr");
    const rest = Array.from(tableRows)
      .map((row) => {
        const rank = row
          .querySelector("span.text-gray-200")
          ?.textContent?.trim();
        const name = row
          .querySelector(
            "td.flex.items-center span.font-semibold:not(.text-gray-200)"
          )
          ?.textContent?.trim();
        const totalWagered = row
          .querySelector("td:nth-child(2)")
          ?.textContent?.trim();
        const price = row.querySelector("td:nth-child(3)")?.textContent?.trim();

        if (rank && name && totalWagered && price) {
          return {
            user: name,
            wagered: currToNum(totalWagered),
            price: currToNum(price),
          };
        }
        return null;
      })
      .filter(Boolean);
    const results = [...top, ...rest];
    results.sort((a, b) => {
      return b.wagered - a.wagered;
    });
    return results;
  });

  await browser.close();
  console.log(scrapedData);
  // Specify the absolute path for the data.json file

  //   const outputPath = path.resolve("data.json");
  const outputPath = path.resolve("/var/www/website/stake-clone/data.json");

  // Write the data to the specified path
  fs.writeFileSync(outputPath, JSON.stringify(scrapedData, null, 2));
})();
