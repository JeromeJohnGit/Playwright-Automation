const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/', { waitUntil: 'load' });
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');
  await page.locator('#signInBtn').click();
  await page.waitForSelector('.card');
  await page.locator('.card').filter({ hasText: 'iphone X' }).first().getByRole('button', { name: 'Add' }).click();
  await page.locator('a.nav-link.btn.btn-primary').click();
  await page.locator("input[type='number']").fill('3');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.locator('#country').fill('India');
  await page.waitForTimeout(1500);
  const suggestions = await page.locator('.suggestions li, .suggestions a').allInnerTexts();
  console.log('suggestions count', suggestions.length);
  console.log('suggestions text', suggestions.join('\n---\n'));
  const checkbox = await page.locator('input[type=checkbox]').first();
  console.log('checkbox visible', await checkbox.isVisible());
  console.log('checkbox enabled', await checkbox.isEnabled());
  console.log('checkbox checked', await checkbox.isChecked());
  const label = await page.locator('label').filter({ hasText: /agree with the|term & conditions|terms & conditions|term/i }).first();
  console.log('label count', await label.count());
  if (await label.count()) {
    console.log('label text', await label.textContent());
  }
  await browser.close();
})();
