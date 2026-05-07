import "dotenv/config";
import { setWorldConstructor, World } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import { ENV } from "../config/env";

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  async init() {
    this.browser = await chromium.launch({
      headless: ENV.headless,
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
