import { Page, Locator, expect } from '@playwright/test';
import { UserRegistrationData } from '../support/test-data-generator';
import { ConsentOverlayPage } from './consent-overlay-page';

export class RegistrationPage extends ConsentOverlayPage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/registrierung');
    await this.page.waitForLoadState('networkidle');
    await this.handleConsentOverlay();
  }

  async fillForm(userData: UserRegistrationData): Promise<void> {
    const titleValue = userData.gender === 'female' ? 'female' : 
                      userData.gender === 'male' ? 'male' : 'genderneutral';
    await this.page.locator('[data-testid="accountNewSalutation"]').selectOption(titleValue);
    
    await this.page.locator('input[name="firstName"], [data-testid="firstNameInput"]').fill(userData.firstName);
    await this.page.locator('input[name="lastName"], [data-testid="lastNameInput"]').fill(userData.lastName);
    await this.page.locator('input[name="email"], [data-testid="emailInput"]').first().fill(userData.email);
    await this.page.locator('input[name="password"], [data-testid="passwordInput"]').fill(userData.password);
    await this.page.locator('input[name="password2"], [data-testid="password2Input"]').fill(userData.password);
    
    if (userData.acceptMarketing) {
      await this.page.locator('[data-testid="newsletterCheckbox"]').check();
    }
    await this.page.locator('[data-testid="agbCheckbox"]').check();
  }

  async submit(): Promise<void> {
    await this.handleConsentOverlay();
    await this.page.locator('[data-testid="register-submit"]').click();
  }

}