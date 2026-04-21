import { setWorldConstructor, World } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  async init() {
    this.browser = await chromium.launch({
      headless: process.env.HEADLESS === "true",
      slowMo: process.env.DEBUG ? 200 : 0,
    });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  async close() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
