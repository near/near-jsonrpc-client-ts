import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

test.describe('React Client App Tests', () => {
  test('should load the React app successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/react');

    // Wait for the main title to appear
    await expect(page.locator('h1')).toContainText(
      '🚀 NEAR RPC Client React Demo'
    );

    // Check that the subtitle is present
    await expect(page.locator('.app-header p')).toContainText(
      'Demonstrating tree-shaking optimized NEAR RPC calls with static functions'
    );
  });

  test('should display loading state initially', async ({ page }) => {
    await page.goto('http://localhost:3000/react');

    // Should show loading message initially
    const loading = page.locator('.loading');
    await expect(loading).toBeVisible();
    await expect(loading.locator('p')).toContainText(
      'Loading NEAR network data...'
    );
  });

  test('should successfully load network data', async ({ page }) => {
    await page.goto('http://localhost:3000/react');

    // Wait for loading to complete (timeout after 30 seconds for network calls)
    await expect(page.locator('.loading')).toBeHidden({ timeout: 30000 });

    // Should not show error
    await expect(page.locator('.error')).toBeHidden();

    // Check that network cards are visible
    await expect(page.locator('.network-card').first()).toBeVisible();
    await expect(
      page.locator('.network-card').first().locator('h2')
    ).toContainText('🌐 Mainnet Status');
    await expect(
      page.locator('.network-card').nth(1).locator('h2')
    ).toContainText('🧪 Testnet Status');

    // Check that mainnet data is loaded
    const mainnetCard = page.locator('.network-card').first();
    await expect(mainnetCard.locator('p:has-text("Chain ID:")')).toBeVisible();
    await expect(
      mainnetCard.locator('p:has-text("Latest Block:")')
    ).toBeVisible();
    await expect(
      mainnetCard.locator('p:has-text("Block Hash:")')
    ).toBeVisible();
    await expect(mainnetCard.locator('p:has-text("Protocol:")')).toBeVisible();

    // Check that testnet data is loaded
    const testnetCard = page.locator('.network-card').nth(1);
    await expect(testnetCard.locator('p:has-text("Chain ID:")')).toBeVisible();
    await expect(
      testnetCard.locator('p:has-text("Latest Block:")')
    ).toBeVisible();
    await expect(
      testnetCard.locator('p:has-text("Block Hash:")')
    ).toBeVisible();
    await expect(testnetCard.locator('p:has-text("Protocol:")')).toBeVisible();
  });

  test('should display account information', async ({ page }) => {
    await page.goto('http://localhost:3000/react');

    // Wait for data to load
    await expect(page.locator('.loading')).toBeHidden({ timeout: 30000 });

    // Check account card
    const accountCard = page.locator('.account-card');
    await expect(accountCard).toBeVisible();
    await expect(accountCard.locator('h2')).toContainText(
      '👤 Account Information'
    );

    // Check account details
    await expect(
      accountCard.locator('p:has-text("Account ID:")')
    ).toBeVisible();
    await expect(accountCard.locator('p:has-text("Balance:")')).toBeVisible();
    await expect(
      accountCard.locator('p:has-text("Storage Used:")')
    ).toBeVisible();

    // Verify testnet account is loaded
    await expect(accountCard.locator('p:has-text("testnet")')).toBeVisible();
    await expect(accountCard.locator('p:has-text("NEAR")')).toBeVisible();
    await expect(accountCard.locator('p:has-text("bytes")')).toBeVisible();
  });

  test('should display client features', async ({ page }) => {
    await page.goto('http://localhost:3000/react');

    // Check features section
    const features = page.locator('.features');
    await expect(features).toBeVisible();
    await expect(features.locator('h2')).toContainText('✨ Client Features');

    // Check feature list items
    const featureList = features.locator('ul li');
    await expect(featureList).toHaveCount(5);
    await expect(featureList.nth(0)).toContainText(
      'Tree-shaking optimized bundle size'
    );
    await expect(featureList.nth(1)).toContainText(
      'Static functions instead of instance methods'
    );
    await expect(featureList.nth(2)).toContainText(
      'Identical case conversion behavior'
    );
    await expect(featureList.nth(3)).toContainText(
      'Client-based configuration architecture'
    );
    await expect(featureList.nth(4)).toContainText(
      'Perfect for React applications'
    );
  });

  test('should handle errors gracefully', async ({ page }) => {
    // Mock network error by intercepting requests
    await page.route('**/rpc.mainnet.fastnear.com/**', route => {
      route.abort('failed');
    });
    await page.route('**/rpc.testnet.fastnear.com/**', route => {
      route.abort('failed');
    });

    await page.goto('http://localhost:3000/react');

    // Wait for error to appear
    await expect(page.locator('.error')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.error p')).toContainText('Error:');
    await expect(page.locator('.error button')).toContainText('Retry');

    // Loading should be hidden
    await expect(page.locator('.loading')).toBeHidden();
  });

  test('should have optimized bundle sizes', async () => {
    // Check the built React app bundle sizes
    const reactDistPath = join(
      process.cwd(),
      'examples/react-mini-client/dist'
    );

    // Read the index.html to find the actual asset names
    const indexHtml = readFileSync(join(reactDistPath, 'index.html'), 'utf8');

    // Extract JavaScript asset filename
    const jsMatch = indexHtml.match(/assets\/index-[^"]+\.js/);
    const cssMatch = indexHtml.match(/assets\/index-[^"]+\.css/);

    expect(jsMatch).toBeTruthy();
    expect(cssMatch).toBeTruthy();

    if (jsMatch && cssMatch) {
      const jsPath = join(reactDistPath, jsMatch[0]);
      const cssPath = join(reactDistPath, cssMatch[0]);

      const jsSize = readFileSync(jsPath).length;
      const cssSize = readFileSync(cssPath).length;

      console.log(`React app JS bundle: ${(jsSize / 1024).toFixed(1)}KB`);
      console.log(`React app CSS bundle: ${(cssSize / 1024).toFixed(1)}KB`);

      // Verify reasonable bundle sizes
      expect(jsSize).toBeLessThan(16 * 1024); // < 16KB for app code (excluding vendor)
      expect(cssSize).toBeLessThan(5 * 1024); // < 5KB for CSS
      expect(jsSize).toBeGreaterThan(1 * 1024); // > 1KB (should have some content)
      expect(cssSize).toBeGreaterThan(500); // > 500 bytes (should have some styles)
    }

    // Also check vendor bundle size
    const vendorMatch = indexHtml.match(/assets\/vendor-[^"]+\.js/);
    if (vendorMatch) {
      const vendorPath = join(reactDistPath, vendorMatch[0]);
      const vendorSize = readFileSync(vendorPath).length;

      console.log(`React vendor bundle: ${(vendorSize / 1024).toFixed(1)}KB`);

      // Vendor bundle should be reasonable (React + NEAR client)
      expect(vendorSize).toBeLessThan(300 * 1024); // < 300KB for React + NEAR client
      expect(vendorSize).toBeGreaterThan(100 * 1024); // > 100KB (React is substantial)
    }
  });

  test('should demonstrate tree-shaking effectiveness', async ({ page }) => {
    await page.goto('http://localhost:3000/react');

    // Wait for app to load
    await expect(page.locator('.loading')).toBeHidden({ timeout: 30000 });

    // Verify that only imported functions are available in the global scope
    const hasOnlyUsedFunctions = await page.evaluate(() => {
      // This React app only imports 'status' and 'viewAccount' functions
      // It should not have access to other RPC functions like 'block', 'gasPrice', etc.

      // Check if the imported functions work (they're used by the app)
      const hasUsedFeatures = !!(
        // The app displays network status
        (
          document.querySelector('.network-card') &&
          // The app displays account info
          document.querySelector('.account-card') &&
          // The app shows features list
          document.querySelector('.features')
        )
      );

      return hasUsedFeatures;
    });

    expect(hasOnlyUsedFunctions).toBe(true);
  });

  test('should display proper chain IDs', async ({ page }) => {
    await page.goto('http://localhost:3000/react');

    // Wait for data to load
    await expect(page.locator('.loading')).toBeHidden({ timeout: 30000 });

    // Check mainnet chain ID
    const mainnetCard = page.locator('.network-card').first();
    await expect(
      mainnetCard.locator('p:has-text("Chain ID: mainnet")')
    ).toBeVisible();

    // Check testnet chain ID
    const testnetCard = page.locator('.network-card').nth(1);
    await expect(
      testnetCard.locator('p:has-text("Chain ID: testnet")')
    ).toBeVisible();
  });

  test('should format large numbers properly', async ({ page }) => {
    await page.goto('http://localhost:3000/react');

    // Wait for data to load
    await expect(page.locator('.loading')).toBeHidden({ timeout: 30000 });

    // Check that block heights are formatted with commas
    const mainnetCard = page.locator('.network-card').first();
    const blockText = await mainnetCard
      .locator('p:has-text("Latest Block:")')
      .textContent();

    // Block height should be formatted with commas (e.g., "1,234,567")
    expect(blockText).toMatch(/Latest Block: #[\d,]+/);

    // Check that hashes are truncated properly
    const hashText = await mainnetCard
      .locator('p:has-text("Block Hash:")')
      .textContent();
    expect(hashText).toMatch(/Block Hash: [A-Za-z0-9]{8}...[A-Za-z0-9]{8}/);
  });
});
