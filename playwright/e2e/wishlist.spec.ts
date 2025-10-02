import { test, expect } from '@playwright/test';
import { WishlistPage } from '../pages/wishlist-page';
import { CategoryPage } from '../pages/category-page';
import { LoginPage } from '../pages/login-page';
import { TestDataGenerator } from '../support/test-data-generator';
import { log } from 'console';

test.describe('Wishlist Functionality', () => {

  //var productC = 5;
  test('Pick 5 random products from category Ecksofas ', async({page})=> {

    const category = 'Ecksofas'

    const CtgPage = new CategoryPage(page);
    //const wishlistPage = new WishlistPage(page);
    await CtgPage.navigateToCategory(category);
    await CtgPage.pickRandomProducts(5);
  } )


test('add to wishlist ', async({page})=> {  

      const login = new LoginPage(page);      
      const CtgPage = new CategoryPage(page);
      const wishlistPage = new WishlistPage(page);
      const loginData = TestDataGenerator.getLoginData();
      
      // Login first
      try {
        await login.navigate();
        await login.fillForm(loginData.email, loginData.password);
        await login.submit();      
        await page.waitForTimeout(1000);
      }
      catch(error){
        console.log('Login failed:', error);  
      }
      
      // Navigate to category and pick products
      await CtgPage.navigateToCategory('Ecksofas');
      const nominatedProductIds = await CtgPage.pickRandomProducts(5);
      
      // Verify we got products
      expect(nominatedProductIds.length).toBeGreaterThan(0);
      
      // Add products to wishlist 
      for (let i = 0; i < nominatedProductIds.length; i++) {
        const pId = nominatedProductIds[i];
        
        //Add to wishlist
        const productElement = page.getByTestId(`p-id-${pId}`);
        const added = await wishlistPage.addToWishlist(productElement);
        
        
        // Navigate to wishlist and verify
        await wishlistPage.goToWishlist();
        const isInWishlist = await wishlistPage.getWishlistItems(pId);
        expect(isInWishlist).toBe(true);

        const entry = page.getByTestId('wishlistEntry')
        .filter({ has: page.getByTestId(`wishlistArticleAdded-${pId}`) });

        expect(await entry.count()).toBeGreaterThan(0); 
        
        console.log(`Product ${pId} successfully added and verified in wishlist`);
      }

  } )

})

