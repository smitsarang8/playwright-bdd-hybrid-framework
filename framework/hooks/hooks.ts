import { Before, After, Status } from '@cucumber/cucumber';
import { CustomWorld } from '../fixtures/world';

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld) {
  await this.close();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === 'FAILED') {
    await this.page.screenshot({
      path: `screenshots/${scenario.pickle.name}.png`,
      fullPage: true
    });
  }
  
After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();

    await this.attach(screenshot, 'image/png');
  }

  await this.close();
});
  await this.close();
});
