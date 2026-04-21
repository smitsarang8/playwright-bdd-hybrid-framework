import { expect } from '@playwright/test';

export class CartPage {
  constructor(private page: any) {}

  async verifyItem() {
    await expect(this.page.locator('.cart_item')).toBeVisible();
  }
}
