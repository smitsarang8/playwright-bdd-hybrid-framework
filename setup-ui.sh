#!/bin/bash

echo "🚀 Setting up Playwright UI BDD Framework..."

# Create folders
mkdir -p framework/{fixtures,hooks,pages}
mkdir -p tests/{features,steps}

# package.json
cat <<EOF > package.json
{
  "name": "playwright-bdd-ui-framework",
  "version": "1.0.0",
  "scripts": {
    "test": "cucumber-js tests/features/**/*.feature"
  },
  "devDependencies": {
    "@cucumber/cucumber": "^10.0.0",
    "@playwright/test": "^1.42.0",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
EOF

# tsconfig
cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "types": ["node"],
    "strict": true,
    "esModuleInterop": true
  }
}
EOF

# cucumber config
cat <<EOF > cucumber.js
module.exports = {
  default: {
    require: [
      "framework/fixtures/**/*.ts",
      "framework/hooks/**/*.ts",
      "tests/steps/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: ["progress"],
    timeout: 60000
  }
};
EOF

# WORLD
cat <<EOF > framework/fixtures/world.ts
import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  async init() {
    this.browser = await chromium.launch({ headless: false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  async close() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
EOF

# HOOKS
cat <<EOF > framework/hooks/hooks.ts
import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from '../fixtures/world';

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld) {
  await this.close();
});
EOF

# LOGIN PAGE
cat <<EOF > framework/pages/LoginPage.ts
export class LoginPage {
  constructor(private page: any) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login() {
    await this.page.fill('#user-name', 'standard_user');
    await this.page.fill('#password', 'secret_sauce');
    await this.page.click('#login-button');
  }
}
EOF

# PRODUCTS PAGE
cat <<EOF > framework/pages/ProductsPage.ts
import { expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: any) {}

  async verifyLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async addProduct() {
    await this.page.locator('.inventory_item button').first().click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}
EOF

# CART PAGE
cat <<EOF > framework/pages/CartPage.ts
import { expect } from '@playwright/test';

export class CartPage {
  constructor(private page: any) {}

  async verifyItem() {
    await expect(this.page.locator('.cart_item')).toBeVisible();
  }
}
EOF

# FEATURE
cat <<EOF > tests/features/order.feature
Feature: UI Order Flow

  Scenario: User logs in and adds product to cart
    Given user is logged in
    When user adds product to cart
    Then cart should contain product
EOF

# STEPS
cat <<EOF > tests/steps/orderSteps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../framework/fixtures/world';
import { LoginPage } from '../../framework/pages/LoginPage';
import { ProductsPage } from '../../framework/pages/ProductsPage';
import { CartPage } from '../../framework/pages/CartPage';

let login: LoginPage;
let products: ProductsPage;
let cart: CartPage;

Given('user is logged in', async function (this: CustomWorld) {
  login = new LoginPage(this.page);
  products = new ProductsPage(this.page);

  await login.goto();
  await login.login();
  await products.verifyLoaded();
});

When('user adds product to cart', async function () {
  await products.addProduct();
  await products.goToCart();
});

Then('cart should contain product', async function (this: CustomWorld) {
  cart = new CartPage(this.page);
  await cart.verifyItem();
});
EOF

echo "📦 Installing dependencies..."
npm install

echo "🌍 Installing browsers..."
npx playwright install

echo "✅ DONE!"
echo "👉 Run: npm test"
