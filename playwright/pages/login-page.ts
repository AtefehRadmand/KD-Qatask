import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
    await this.handleConsentOverlay();
  }

  async fillForm(email: string, password: string): Promise<void> {
    await this.page.locator('input[type="email"], input[name="email"]').first().fill(email);
    await this.page.locator('input[type="password"], input[name="password"]').first().fill(password);
  }

  async submit(): Promise<void> {
    await this.handleConsentOverlay();
    await this.page.locator('[data-testid="login-submit"]').click();
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const currentUrl = this.page.url();
      
      // Check if we're not on login page
      if (currentUrl.includes('/login')) {
        return false;
      }
      
      // Check for user account elements
      const userElements = [
        'a[href*="/kundenkonto"]',
        'a[href*="/account"]',
        '.user-menu',
        '.account-menu'
      ];
      
      for (const selector of userElements) {
        const element = this.page.locator(selector);
        if (await element.isVisible()) {
          return true;
        }
      }
      
      // If we're on homepage or other pages (not login), consider logged in
      return currentUrl.includes('sofa.de') && !currentUrl.includes('/login');
    } catch (error) {
      return false;
    }
  }

  async hasErrors(): Promise<boolean> {
    try {
      const errorElements = this.page.locator('.formInput__error, .error-message, [class*="error"]');
      return await errorElements.count() > 0;
    } catch (error) {
      return false;
    }
  }

  private async handleConsentOverlay(): Promise<void> {
    try {
      // Remove consent overlays with JavaScript
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