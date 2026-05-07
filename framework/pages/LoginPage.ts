import { Page, Locator, expect } from "@playwright/test";
import { ENV } from "../config/env";

export class LoginPage {

  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(ENV.baseURL, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
  }

  async login() {
    await expect(this.usernameInput).toBeVisible({ timeout: 30000 });
    await this.usernameInput.fill(ENV.standardUsername);
    await this.passwordInput.fill(ENV.standardPassword);

    await Promise.all([
      this.page.waitForURL('**/inventory.html', { timeout: 30000 }),
      this.loginButton.click(),
    ]);

    await expect(this.page.locator('.inventory_list')).toBeVisible({ timeout: 30000 });
  }

  async lockedUserLogin() {
    await expect(this.usernameInput).toBeVisible({ timeout: 30000 });
    await this.usernameInput.fill(ENV.lockedOutUsername);
    await this.passwordInput.fill(ENV.lockedOutPassword);
    await this.loginButton.click();
    await expect(this.errorMessage).toBeVisible({ timeout: 30000 });
  }

  async verifyLockedOutMessage() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }
}
  
