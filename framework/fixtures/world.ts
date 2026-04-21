import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  async init() {
    this.browser = await chromium.launch({
  headless: process.env.CI ? true : false
});
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  async close() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
