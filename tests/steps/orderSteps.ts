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

Given('user is logging in with locked out credentials', async function (this: CustomWorld) {
  login = new LoginPage(this.page);
  await login.goto();
  await login.lockedUserLogin();
});

Then('user should see lockout message', async function () {
  await login.verifyLockedOutMessage();
});
