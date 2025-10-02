# SOFA.de Playwright E2E Tests

This directory contains end-to-end tests for the SOFA.de using Playwright.

## Test Structure

### Page Objects (`pages/`)

- `registration-page.ts` - Page object for the user registration page
- `login-page.ts` - Page object for user login
- `category-page` - Page object for category page and picking product from desired category
- `wishlist-page` - Page object for wishlist

### Test Files (`e2e/`)

- `registration.spec.ts` - Test scenarios for user registration
- `login.spec.ts` - Test scenarios for user login
- `wishlist.spec.ts` - Test scenarios for working with wishlist

## Test Scenarios

### User Registration Tests

1. **Successful Registration** - Creates a user account

### User Login Tests

1. **Successful Login** - uses the credentials to login successfully
2. **Unsuccessful Login** - uses the wrong credentials to login unsuccessfully
3. **Successful Login** - uses the credentials to login successfully

### Add to wishlist

1. **Select random products** - selects random products from a category
2. **Add to wishlist** - add selected products to wishlist and verifies is added

## Running Tests

### Prerequisites

- Node.js installed
- Dependencies installed: `npm install`

### Test Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (visible browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test registration.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
```

### Test Configuration

The tests are configured in `playwright.config.ts` with:

- Base URL: `https://www.sofa.de`
- Multiple browser support (Chrome, Firefox, Safari)
- Screenshots and videos on failure
- Trace collection for debugging
