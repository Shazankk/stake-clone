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
  await page.waitForSelector(
    'div[class*="Leaderboard_custom_leaderboard_table"]'
  );
  const scrapedData = await page.evaluate(() => {
    function currToNum(str) {
      return parseFloat(str.replace(/[^0-9.-]+/g, ""));
    }
    let cards = Array.from(
      document.querySelectorAll('div[class*="Leaderboard_leader_board_card"]')
    ).reduce((arr, c) => {
      let user = c.querySelector(
        'h4[class*="Leaderboard_leader_board_card_user"]'
      );
      if (user) {
        let wagered = c.querySelector(
          'div[class*="Leaderboard_leader_board_card_wagered"] span'
        ).textContent;
        let prize = c.querySelector(
          'div[class*="Leaderboard_leader_board_card_btn__"]'
        ).textContent;
        arr.push({
          user: user.textContent,
          wagered: currToNum(wagered),
          price: currToNum(prize),
        });
      }
      return arr;
    }, []);

    Array.from(
      document.querySelectorAll(
        'div[class*="Leaderboard_leaderboard_table_row__"]'
      )
    ).forEach((c) => {
      const user = c.querySelector(":nth-child(1) p").textContent;
      const wagered = c.querySelector("div:nth-child(2) ").textContent;
      const prize = c.querySelector("div:nth-child(3) ").textContent;
      cards.push({
        user: user,
        wagered: currToNum(wagered),
        prize: currToNum(prize),
      });
    });
    cards.sort((a, b) => {
      return b.wagered - a.wagered;
    });
    return cards;
  });

  await browser.close();

  // Specify the absolute path for the data.json file
  const outputPath = path.resolve("/var/www/website/stake-clone/data.json");

  // Write the data to the specified path
  fs.writeFileSync(outputPath, JSON.stringify(scrapedData, null, 2));
})();
