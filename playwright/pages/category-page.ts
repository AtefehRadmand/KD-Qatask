import { Page } from '@playwright/test';
import { ConsentOverlayPage } from './consent-overlay-page';



export class CategoryPage extends ConsentOverlayPage {
    constructor(page: Page) {
        super(page);
    }


async navigateToCategory(categoryName: string): Promise<void> {
    await this.page.goto(`/${categoryName.toLowerCase()}`);
    await this.page.waitForLoadState('networkidle');
    await this.handleConsentOverlay();
  }   

async pickRandomProducts(count: number): Promise<string[]> {
    try {
        // Find all product articles on the page
        
        const articles =  await this.page.locator("li article");
        const totalProducts = await articles.count();
        
        if (totalProducts === 0) {
            console.log('No products found on this page');
            return [];
        }

        console.log(`Found ${totalProducts} products to choose from`);
        
        const selectedProductIds: string[] = [];
        const usedIndices = new Set<number>();
        
        // Pick random products one by one, ensuring no duplicates
        for (let i = 0; i < count; i++) {
            let randomIndex: number;
            let attempts = 0;
            
            // Keep trying until we find an unused index
            do {
                randomIndex = Math.floor(Math.random() * totalProducts);
                attempts++;
            } while (usedIndices.has(randomIndex) && attempts < 100);
            
            // If we couldn't find a unique index, break
            if (attempts >= 100) {
                console.log(`Could not find unique product after ${attempts} attempts`);
                break;
            }
            
            usedIndices.add(randomIndex);
            const product = articles.nth(randomIndex);
            
            // Get product ID from data-testid attribute
            const dataTestId = await product.getAttribute('data-testid');
            
            if (dataTestId) {
                // Extract product ID from data-testid="p-id-**" format
                const productId = dataTestId.replace('p-id-', '');
                selectedProductIds.push(productId);
                
                // Get product name for logging
                const productText = await product.textContent();
                const shortDescription = productText?.trim().substring(0, 50) || 'Unknown product';
                
                console.log(`Picked product ${i + 1} (ID: ${productId}): ${shortDescription}...`);
            }
        }        
        return selectedProductIds;

    } catch (error) {
        console.log(`Error picking products: ${error}`);
        return [];
    }
 }

 }

