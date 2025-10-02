# Docker Setup for Playwright Tests

This project has been dockerized to provide a consistent testing environment. The Docker setup includes all necessary dependencies and browsers for running Playwright tests.

## Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Run all tests in headless mode
npm run docker:compose

# Run tests with browser UI (headed mode)
npm run docker:compose:headed

# Clean up containers and volumes
npm run docker:clean
```

### Option 2: Using Docker directly

```bash
# Build the Docker image
npm run docker:build

# Run tests
npm run docker:run
```

## Running Specific Tests

### Using Docker Compose

```bash
# Run only wishlist tests
docker-compose run playwright-tests npx playwright test playwright/e2e/wishlist.spec.ts

# Run only login tests
docker-compose run playwright-tests npx playwright test playwright/e2e/login.spec.ts

# Run tests in debug mode
docker-compose run playwright-tests npx playwright test --debug
```

### Using Docker directly

```bash
# Run specific test file
docker run --rm -v $(pwd)/test-results:/app/test-results playwright-tests npx playwright test playwright/e2e/wishlist.spec.ts

# Run with browser UI
docker run --rm -v $(pwd)/test-results:/app/test-results -e HEADLESS=false playwright-tests
```

## Volume Mounts

The Docker setup automatically mounts the following directories:

- `./test-results` → `/app/test-results` (Test results and artifacts)
- `./playwright-report` → `/app/playwright-report` (HTML reports)
- `./screenshots` → `/app/screenshots` (Screenshots)
- `./videos` → `/app/videos` (Test recordings)

## Environment Variables

Customize the Docker behavior with these environment variables:

```bash
# Run in headed mode
HEADLESS=false

# Enable CI mode
CI=true

# Set browser
BROWSER=chromium  # or firefox, webkit
```

## NPM Scripts

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

### Debugging

```bash
# Run container interactively
docker-compose run playwright-tests /bin/bash

# Check container logs
docker-compose logs playwright-tests

# Inspect running container
docker exec -it playwright-tests /bin/bash
```

## CI/CD Integration

For CI/CD pipelines, use the headless service:

```yaml
# GitHub Actions example
- name: Run Playwright Tests
  run: |
    docker-compose up playwright-tests
```

## Performance Tips

1. **Use multi-stage builds** for smaller images
2. **Cache node_modules** in Docker layer
3. **Run tests in parallel** when possible
4. **Use .dockerignore** to exclude unnecessary files

## File Structure

```
├── Dockerfile              # Main Docker configuration
├── docker-compose.yml     # Multi-service setup
├── .dockerignore          # Files to exclude from build
├── DOCKER.md              # This documentation
└── package.json           # Updated with Docker scripts
```

## Support

Encountering issues with the Docker setup:

1. Check Docker and Docker Compose versions
2. Ensure sufficient disk space and memory
3. Verify network connectivity for browser downloads
4. Check the logs: `docker-compose logs`
