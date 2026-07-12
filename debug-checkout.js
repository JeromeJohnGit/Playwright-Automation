const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/', { waitUntil: 'domcontentloaded' });

  await page.locator("input[name='username']").fill('rahulshettyacademy');
  await page.locator("input[name='password']").fill('Learning@830$3mK2');
  await page.locator('input#signInBtn').click();
  await page.waitForSelector('.card');

  await page.locator('.card').filter({ hasText: 'iphone X' }).first().getByRole('button', { name: /^Add$/i }).click();

  const checkoutLink = page.getByRole('link', { name: /checkout/i }).first();
  console.log('checkout link text:', await checkoutLink.textContent());
  await checkoutLink.click();

  await page.waitForLoadState('networkidle');
  console.log('page title:', await page.title());
  console.log('body text snippet:', (await page.locator('body').textContent()).slice(0, 4000));

  const buttons = await page.locator('button').allTextContents();
  console.log('buttons:', buttons);
  const inputs = await page.locator('input').evaluateAll((els) => els.map(el => ({ name: el.getAttribute('name'), placeholder: el.getAttribute('placeholder'), type: el.getAttribute('type'), value: el.value })));
  console.log('inputs:', JSON.stringify(inputs, null, 2));

  await browser.close();
})();
