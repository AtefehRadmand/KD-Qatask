import { Page, Locator } from '@playwright/test';
import { ConsentOverlayPage } from './consent-overlay-page';

export class BasketPage extends ConsentOverlayPage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    await this.handleConsentOverlay();
  }

  async addItemToBasket(itemId: string): Promise<void> {
    await this.page.goto(`/produkt/${itemId}`);
    await this.page.waitForLoadState('networkidle');
    await this.handleConsentOverlay();

    const pageTitle = await this.page.title();
    const pageUrl = this.page.url();
    console.log(`Product page: ${pageTitle} (${pageUrl})`);

    const addButton = this.page.locator('[data-testid="add-to-basket"], .add-to-basket, .add-to-cart, button:has-text("In den Warenkorb"), button:has-text("Hinzufügen")').first();
    
    if (await addButton.isVisible()) {
      await addButton.click();
      console.log(`Added item ${itemId} to basket`);
    } else {
      console.log(`Could not find add to basket button for item ${itemId}`);
    }
  }

  async goToBasket(): Promise<void> {
    await this.page.goto('/warenkorb');
    await this.page.waitForLoadState('networkidle');
    await this.handleConsentOverlay();
  }

  async goToWishlist(): Promise<void> {
    await this.page.goto('/wishlist');
    await this.page.waitForLoadState('networkidle');
    await this.handleConsentOverlay();
  }

  async getBasketItems(): Promise<string[]> {
    const items = this.page.locator('[data-testid="basket-item"], .basket-item, .cart-item');
    const count = await items.count();
    const itemNames: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const itemText = await items.nth(i).textContent();
      if (itemText) {
        itemNames.push(itemText.trim());
      }
    }
    
    return itemNames;
  }

  async getBasketCount(): Promise<number> {
    const items = this.page.locator('[data-testid="basket-item"], .basket-item, .cart-item');
    return await items.count();
  }

}
