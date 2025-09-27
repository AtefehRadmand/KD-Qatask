import { Page } from '@playwright/test';

export class ConsentOverlayPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async handleConsentOverlay(): Promise<void> {
    try {
      await this.page.evaluate(() => {
        const overlays = document.querySelectorAll('.consentForm__overlay, .consentForm__container, .consentForm__details');
        overlays.forEach(overlay => overlay.remove());
      });
      await this.page.waitForTimeout(1000);
    } catch (error) {
      // Continue if overlay handling fails
    }
  }
}
