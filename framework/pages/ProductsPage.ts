import { expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: any) {}

  async verifyLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async addProduct() {
    await this.page.locator('.inventory_item button').first().click({timeout: 10000});
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}
