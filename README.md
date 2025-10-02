# SOFA.de Playwright E2E Tests

This directory contains end-to-end tests for the SOFA.de using Playwright.

## Test Structure

### Page Objects (`pages/`)

- `registration-page.ts` - Page object for the user registration page
- `login-page.ts` - Page object for user login
- `category-page` - Page object for category page and picking product from desired category
- `wishlist-page` - Page object for wishlist

### Test Files (`e2e/`)

the generic test data was temporarily unsed in the code and now the code uses static data so:

## please note before running the registration test make a change in email

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

### Docker operations

The following npm scripts are available for Docker operations:

```bash
# Docker operations
npm run docker:build          # Build Docker image
npm run docker:run           # Run tests in Docker
npm run docker:compose       # Run with docker-compose
npm run docker:compose:headed # Run with browser UI
npm run docker:clean         # Clean up containers

# Test specific files
npm run test:wishlist        # Run wishlist tests
npm run test:login           # Run login tests
npm run test:basket          # Run basket tests
npm run test:checkout        # Run checkout tests
npm run test:registration    # Run registration tests
```
