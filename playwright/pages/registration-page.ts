import { Page, Locator, expect } from '@playwright/test';
import { UserRegistrationData } from '../support/test-data-generator';

export class RegistrationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('/registrierung');
    await this.page.waitForLoadState('networkidle');
    await this.handleConsentOverlay();
  }

  async fillForm(userData: UserRegistrationData): Promise<void> {
    // Select title
    const titleValue = userData.gender === 'female' ? 'female' : 
                      userData.gender === 'male' ? 'male' : 'genderneutral';
    await this.page.locator('[data-testid="accountNewSalutation"]').selectOption(titleValue);
    
    // Fill form fields
    await this.page.locator('input[name="firstName"], [data-testid="firstNameInput"]').fill(userData.firstName);
    await this.page.locator('input[name="lastName"], [data-testid="lastNameInput"]').fill(userData.lastName);
    await this.page.locator('input[name="email"], [data-testid="emailInput"]').first().fill(userData.email);
    await this.page.locator('input[name="password"], [data-testid="passwordInput"]').fill(userData.password);
    await this.page.locator('input[name="password2"], [data-testid="password2Input"]').fill(userData.password);
    
    // Check checkboxes
    if (userData.acceptMarketing) {
      await this.page.locator('[data-testid="newsletterCheckbox"]').check();
    }
    await this.page.locator('[data-testid="agbCheckbox"]').check();
  }

  async submit(): Promise<void> {
    await this.handleConsentOverlay();
    await this.page.locator('[data-testid="register-submit"]').click();
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