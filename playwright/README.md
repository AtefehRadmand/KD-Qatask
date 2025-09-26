# SOFA.de Playwright E2E Tests

This directory contains end-to-end tests for the SOFA.de using Playwright.

## Test Structure

### Page Objects (`pages/`)

- `registration-page.ts` - Page object for the user registration page
- `test-data-generator.ts` - Utility for generating random test data

### Test Files (`e2e/`)

- `registration.spec.ts` - Test scenarios for user registration

## Test Scenarios

### User Registration Tests

1. **Successful Registration** - Creates a user account with random generated data
2. **Required Field Validation** - Tests form validation for required fields
3. **Email Format Validation** - Tests email format validation
4. **Password Confirmation** - Tests password confirmation matching
5. **Terms Acceptance** - Tests that terms must be accepted
6. **Newsletter Subscription** - Tests newsletter subscription options
7. **Data Uniqueness** - Verifies that generated test data is unique

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

## Test Data Generation

The `TestDataGenerator` class creates realistic German user data including:

- Random email addresses
- German first and last names
- German phone numbers
- German addresses and postal codes
- Random passwords
- Date of birth (age 18-65)

## Page Object Model

The tests follow POM principles:

- **Getters** - Locate page elements
- **Actions** - Perform user interactions
- **Queries** - Check page state

Example usage:

```typescript
const registrationPage = new RegistrationPage(page);
await registrationPage.navigate();
await registrationPage.registerUser(testUserData);
const isSuccessful = await registrationPage.isRegistrationSuccessful();
```

## Debugging

### View Test Results

- HTML report: `npx playwright show-report`
- Trace viewer: `npx playwright show-trace trace.zip`

### Common Issues

1. **Element not found** - Check if selectors match the actual page structure
2. **Timeout errors** - Increase wait times or check network conditions
3. **Form validation** - Verify that the form structure hasn't changed

## Maintenance

When the SOFA.de website changes:

1. Update selectors in page objects
2. Adjust test expectations
3. Update test data if needed
4. Re-run tests to verify functionality
