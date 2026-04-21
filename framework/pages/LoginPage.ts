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
