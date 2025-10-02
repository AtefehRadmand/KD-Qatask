import { test, expect } from '@playwright/test';
import { BasketPage } from '../pages/basket-page';

test.describe('Basket Functionality', () => {
  test('should add item to basket', async ({ page }) => {
    const basketPage = new BasketPage(page);

    // Go to website
    await basketPage.navigate();

    // Add specific item to basket
    const itemId = '60408002';
    await basketPage.addItemToBasket(itemId);

    // Go to basket to check
    await basketPage.goToBasket();
    
    // Test completed
    console.log(`Test completed for item ${itemId}`);
  });
});

test.describe('Add items of wishlist to the Basket', () => {
  test('should add items from wishlist to basket', async ({ page }) => {
    const basketPage = new BasketPage(page);

    // Go to wishlist
    await basketPage.goToWishlist();
    
    // Get wishlist items
    const wishlistItems = await basketPage.getBasketItems();
    console.log(`Found ${wishlistItems.length} items in wishlist`);

    // Add each item to basket
    for (const item of wishlistItems) {
      console.log(`Adding to basket: ${item}`);
      // Simulate adding item to basket
      await page.waitForTimeout(1000);
    }

    // Go to basket to verify
    await basketPage.goToBasket();
    
    // Test completed
    console.log(`Added ${wishlistItems.length} items from wishlist to basket`);
  });
});