/* eslint-disable no-undef */
const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const path = require("path");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto("https://www.bigfoltz.com/leaderboards");

    await page.waitForSelector("div.flex.justify-center.space-x-6.mb-6");

    const navigationItems = await page.evaluate(() => {
      const parentDiv = document.querySelector(
        "div.flex.justify-center.space-x-6.mb-6"
      );

      if (!parentDiv) return [];

      const spans = parentDiv.querySelectorAll("span");
      return Array.from(spans).map((span) => span.textContent.trim());
    });

    console.log("Navigation Items:", navigationItems);

    const allScrapedDetails = {};

    for (const item of navigationItems) {
      console.log(`Scraping additional data for: ${item}`);

      await page.evaluate((itemText) => {
        const element = Array.from(
          document.querySelectorAll("div.flex.justify-center span")
        ).find((span) => span.textContent.trim() === itemText);
        if (element) element.click();
      }, item);

      await page.waitForSelector("table.w-full.text-left.leaderboard");

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

        const top = playerDivs.length
          ? dedupeArray(
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
                  const prize = playerDiv
                    .querySelector(".top-player-button")
                    ?.textContent?.trim();

                  if (wageredText && wageredValue) {
                    return {
                      user: title,
                      wagered: currToNum(wageredValue),
                      prize: currToNum(prize),
                    };
                  }
                  return null;
                })
                .filter(Boolean),
              (item) => `${item.user}-${item.wagered}-${item.prize}`
            )
          : [];

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
            const wagered = row
              .querySelector("td:nth-child(2)")
              ?.textContent?.trim();
            const prize = row
              .querySelector("td:nth-child(3)")
              ?.textContent?.trim();

            const rowData = {};
            if (rank) rowData.rank = rank;
            if (name) rowData.name = name;
            if (wagered) rowData.wagered = currToNum(wagered);
            if (prize) rowData.prize = currToNum(prize);

            return rowData;
          })
          .filter(Boolean);

        const results = [...top, ...rest];
        results.sort((a, b) => b.wagered - a.wagered);
        return results;
      });

      allScrapedDetails[item] = scrapedData;

      console.log(`Data for ${item} scraped successfully.`);
    }

    const outputPath = path.resolve("data.json");
    // const outputPath = path.resolve("/var/www/website/stake-clone/data.json");
    fs.writeFileSync(outputPath, JSON.stringify(allScrapedDetails, null, 2));
    console.log(`All data saved to ${outputPath}`);

    await browser.close();
  } catch (error) {
    console.error("Error during scraping:", error);
  }
})();
