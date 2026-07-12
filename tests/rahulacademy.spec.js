const { test, expect } = require('@playwright/test');

test('Login, add iPhone X, update quantity', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Login
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2'); // Updated to standard course password if needed
    await page.locator('#signInBtn').click();
    await page.waitForTimeout(1500);

    // Wait for the URL to change or the home page to load instead of hardcoded timeouts
    await page.waitForURL('**/shop');
    await page.waitForTimeout(1000);

    // Add iPhone X to cart
    const product = page.locator('.card').filter({ hasText: 'iphone X' });
    await expect(product).toBeVisible();
    await page.waitForTimeout(1000);
    await product.getByRole('button', { name: 'Add' }).click();
    await page.waitForTimeout(1200);

    // Go to Checkout
    await page.locator("a.nav-link.btn.btn-primary").click();
    await page.waitForTimeout(1200);

    // Update quantity
    const quantity = page.locator("input[type='number']");
    await quantity.fill('3');
    await page.waitForTimeout(1000);

    // Checkout
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.waitForTimeout(1500);

   // Enter country and select a location from suggestions
const countryInput = page.locator('#country');
await countryInput.fill('India');

// Wait for the suggestion to appear and click it
await page.locator('.suggestions li', { hasText: 'India' }).click({ force: true, timeout: 5000 });

   
});
