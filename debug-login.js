const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/', { waitUntil: 'domcontentloaded' });
  console.log('title1', await page.title());
  await page.locator("input[name='username']").fill('rahulshettyacademy');
  await page.locator("input[name='password']").fill('Learning@830$3mK2');
  await page.locator('input#signInBtn').click();
  await page.waitForTimeout(4000);
  console.log('title2', await page.title());
  console.log('url', page.url());
  console.log('body text slice', (await page.locator('body').textContent()).slice(0, 1000));
  const cards = await page.locator('.card').count();
  console.log('cards', cards);
  for (let i = 0; i < Math.min(cards, 5); i++) {
    const txt = await page.locator('.card').nth(i).textContent();
    console.log('card', i, txt);
  }
  await browser.close();
})();
