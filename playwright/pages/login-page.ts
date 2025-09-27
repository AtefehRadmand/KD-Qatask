import { Page, Locator } from '@playwright/test';
import { ConsentOverlayPage } from './consent-overlay-page';

export class LoginPage extends ConsentOverlayPage {
  constructor(page: Page) {
    super(page);
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
    const currentUrl = this.page.url();
    return currentUrl.includes('sofa.de') && !currentUrl.includes('/login');
  }

  async hasErrors(): Promise<boolean> {
    const errorElements = this.page.locator('.formInput__error, .error-message, [class*="error"]');
    return await errorElements.count() > 0;
  }

}