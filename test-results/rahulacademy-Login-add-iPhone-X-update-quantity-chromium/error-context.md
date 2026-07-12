# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: rahulacademy.spec.js >> Login, add iPhone X, update quantity
- Location: tests\rahulacademy.spec.js:3:1

# Error details

```
TimeoutError: locator.click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('.suggestions li').filter({ hasText: 'India' })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e5]:
    - link "ProtoCommerce" [ref=e6] [cursor=pointer]:
      - /url: "#"
    - list [ref=e7]:
      - listitem [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: /angularpractice
      - listitem [ref=e10]:
        - link "Shop" [ref=e11] [cursor=pointer]:
          - /url: /angularpractice/shop
  - generic [ref=e12]:
    - navigation [ref=e13]:
      - generic [ref=e14]:
        - link "ProtoCommerce Home" [ref=e15] [cursor=pointer]:
          - /url: "#"
        - list [ref=e17]:
          - listitem [ref=e18]:
            - generic [ref=e19] [cursor=pointer]:
              - text: Checkout ( 1 )
              - generic [ref=e20]: (current)
    - generic [ref=e23]:
      - generic [ref=e24]:
        - generic [ref=e25]:
          - text: Please choose your delivery location.
          - text: Then click on purchase button
        - textbox "Please choose your delivery location. Then click on purchase button" [active] [ref=e26]: India
      - generic [ref=e27]:
        - checkbox "I agree with the term & Conditions" [ref=e28]
        - generic [ref=e29] [cursor=pointer]: I agree with the term & Conditions
      - button "Purchase" [ref=e31] [cursor=pointer]
    - contentinfo [ref=e32]:
      - paragraph [ref=e34]: Copyright © ProtoCommerce 2018
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test('Login, add iPhone X, update quantity', async ({ page }) => {
  4  | 
  5  |     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  6  | 
  7  |     // Login
  8  |     await page.locator('#username').fill('rahulshettyacademy');
  9  |     await page.locator('#password').fill('Learning@830$3mK2'); // Updated to standard course password if needed
  10 |     await page.locator('#signInBtn').click();
  11 |     await page.waitForTimeout(1500);
  12 | 
  13 |     // Wait for the URL to change or the home page to load instead of hardcoded timeouts
  14 |     await page.waitForURL('**/shop');
  15 |     await page.waitForTimeout(1000);
  16 | 
  17 |     // Add iPhone X to cart
  18 |     const product = page.locator('.card').filter({ hasText: 'iphone X' });
  19 |     await expect(product).toBeVisible();
  20 |     await page.waitForTimeout(1000);
  21 |     await product.getByRole('button', { name: 'Add' }).click();
  22 |     await page.waitForTimeout(1200);
  23 | 
  24 |     // Go to Checkout
  25 |     await page.locator("a.nav-link.btn.btn-primary").click();
  26 |     await page.waitForTimeout(1200);
  27 | 
  28 |     // Update quantity
  29 |     const quantity = page.locator("input[type='number']");
  30 |     await quantity.fill('3');
  31 |     await page.waitForTimeout(1000);
  32 | 
  33 |     // Checkout
  34 |     await page.getByRole('button', { name: 'Checkout' }).click();
  35 |     await page.waitForTimeout(1500);
  36 | 
  37 |    // Enter country and select a location from suggestions
  38 | const countryInput = page.locator('#country');
  39 | await countryInput.fill('India');
  40 | 
  41 | // Wait for the suggestion to appear and click it
> 42 | await page.locator('.suggestions li', { hasText: 'India' }).click({ force: true, timeout: 5000 });
     |                                                             ^ TimeoutError: locator.click: Timeout 5000ms exceeded.
  43 | 
  44 |    
  45 | });
```