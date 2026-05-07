import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../fixtures/world';

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    await this.attach(screenshot, 'image/png');
  }

  await this.close();
});

