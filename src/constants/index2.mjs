import puppeteer from "puppeteer-extra";
import fs from "fs";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: true });
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
        let price = c.querySelector(
          'div[class*="Leaderboard_leader_board_card_btn__"]'
        ).textContent;
        arr.push({
          user: user.textContent,
          wagered: currToNum(wagered),
          price: currToNum(price),
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
      const price = c.querySelector("div:nth-child(3) ").textContent;
      cards.push({
        user: user,
        wagered: currToNum(wagered),
        price: currToNum(price),
      });
    });
    cards.sort((a, b) => {
      return b.wagered - a.wagered;
    });
    return cards;
  });

  await browser.close();
  fs.writeFileSync("data.json", JSON.stringify(scrapedData, null, 2));
})();
