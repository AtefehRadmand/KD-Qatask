import { Page, Locator, expect } from '@playwright/test';
import { ConsentOverlayPage } from './consent-overlay-page';

export class WishlistPage extends ConsentOverlayPage {
  constructor(page: Page) {
    super(page);
  }
  
  async addToWishlist(productElement: Locator): Promise<boolean> {
    try {
      const wishlistButton =  productElement.getByTestId('wishlistHeart');
      
      // Look for wishlist button          
      await this.page.waitForLoadState('domcontentloaded');

      const buttonText = await wishlistButton.textContent();
      console.log('text of wishlist button: ', buttonText)
      
      if (buttonText === "Von der Wunschliste entfernen") {
        console.log('Product already in wishlist');
        return true;
      } 
      else if(buttonText === "Zur Wunschliste hinzufügen") {

        await wishlistButton.waitFor({ state: 'visible', timeout: 20000 });
        await wishlistButton.click();   
        await this.page.waitForTimeout(500);         
      
      }
       return true
    } catch (error) {

      return false
    }
  }

  async goToWishlist(): Promise<void> {
    
    await this.page.goto('/wunschliste');    
    //, { waitUntil: 'domcontentloaded' }
    //await this.page.waitForLoadState('networkidle')
    
    await this.handleConsentOverlay();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    
  }

  async getWishlistItems(productID: string): Promise<boolean> {
    // Don't navigate if we're already on the wishlist page
    const currentUrl = this.page.url();
    if (!currentUrl.includes('/wunschliste')) {
      await this.page.goto('/wunschliste', { waitUntil: 'domcontentloaded' });
      await this.handleConsentOverlay();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
    }
    
    const wishlistItems = this.page.locator('.wishlistEntry');
    const count = await wishlistItems.count();
    
    console.log(`Found ${count} items in wishlist`);
    console.log(`Looking for product ID: ${productID}`);
    
    // Get all wishlist items with their data-wishlist-entry-id attributes
    for (let i = 0; i < count; i++) {
      const item = wishlistItems.nth(i);
      
      // find the data-wishlist-entry-id attribute
      let entryId = await item.getAttribute('data-wishlist-entry-id');
      
      // looking for it in child elements
      if (!entryId) {
        const childWithId = item.locator('[data-wishlist-entry-id]').first();
        if (await childWithId.count() > 0) {
          entryId = await childWithId.getAttribute('data-wishlist-entry-id');
        }
      }
      
      // If still not found, try looking for any element with the attribute
      if (!entryId) {
        const anyElementWithId = this.page.locator(`[data-wishlist-entry-id="${productID}"]`);
        if (await anyElementWithId.count() > 0) {
          entryId = productID;
        }
      }
      
      console.log(`Item ${i} has data-wishlist-entry-id: ${entryId}`);
      
      if (entryId === productID) {
        console.log(`Product ${productID} found in wishlist successfully`);
        return true;
      }
    }    
    
    console.log(`Product ${productID} not found in wishlist`);
    console.log(`Available product IDs in wishlist:`);
    
    // Log all available IDs 
    for (let i = 0; i < count; i++) {
      const item = wishlistItems.nth(i);
      const entryId = await item.getAttribute('data-wishlist-entry-id');
      console.log(`  - Item ${i}: ${entryId || 'NO ID FOUND'}`);
    }
    
    return false;
  }


}
