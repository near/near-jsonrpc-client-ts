import { test, expect } from '@playwright/test';

test.describe('NEAR RPC One-Liner Browser Tests', () => {
  test('should work as one-liner dynamic import from any page', async ({
    page,
  }) => {
    // Serve from the local origin so cross-origin/opaque-origin module
    // imports are allowed (modern Chromium blocks http imports from about:blank)
    await page.goto('http://localhost:3000/');

    // Execute the one-liner from the README
    const result = await page.evaluate(async () => {
      const module =
        await import('http://localhost:3000/browser-standalone.js');
      const { NearRpcClient, block } = module;
      const client = new NearRpcClient('https://rpc.testnet.fastnear.com');
      const blockResult = await block(client, { finality: 'final' });
      return {
        height: blockResult.header.height,
        hash: blockResult.header.hash,
        success: true,
      };
    });

    // Verify the result
    expect(result).toHaveProperty('height');
    expect(result).toHaveProperty('hash');
    expect(result).toHaveProperty('success', true);
    expect(typeof result.height).toBe('number');
    expect(typeof result.hash).toBe('string');
    expect(result.height).toBeGreaterThan(0);
    // NEAR block hashes are base58-encoded 32-byte values (43-44 chars)
    expect(result.hash).toMatch(/^[1-9A-HJ-NP-Za-km-z]{43,44}$/);
  });

  test('should work with local bundle via data URL', async ({ page }) => {
    // Go to any page
    await page.goto('http://localhost:3000/');

    // Read the local bundle and create a data URL
    const { readFileSync } = await import('fs');
    const { join } = await import('path');
    const bundlePath = join(
      process.cwd(),
      'packages/jsonrpc-client/dist/browser-standalone.js'
    );
    const bundleContent = readFileSync(bundlePath, 'utf8');
    const dataUrl = `data:text/javascript;base64,${Buffer.from(bundleContent).toString('base64')}`;

    // Execute using the data URL (simulates the one-liner but with local bundle)
    const result = await page.evaluate(async bundleDataUrl => {
      const { NearRpcClient, block } = await import(bundleDataUrl);
      const client = new NearRpcClient('https://rpc.testnet.fastnear.com');
      const blockResult = await block(client, { finality: 'final' });
      return {
        height: blockResult.header.height,
        hash: blockResult.header.hash,
        timestamp: blockResult.header.timestamp,
        success: true,
      };
    }, dataUrl);

    // Verify the result
    expect(result).toHaveProperty('height');
    expect(result).toHaveProperty('hash');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('success', true);
    expect(typeof result.height).toBe('number');
    expect(typeof result.hash).toBe('string');
    expect(typeof result.timestamp).toBe('number');
    expect(result.height).toBeGreaterThan(0);
  });

  test('should work when pasted into any website console', async ({ page }) => {
    // Simulate a real third-party website by loading a different origin
    // (127.0.0.1 vs localhost) and importing the bundle cross-origin via CORS.
    // Modern Chromium blocks module imports from opaque origins (e.g. data: or
    // about:blank), so an opaque-origin page is not a realistic console paste.
    await page.goto('http://127.0.0.1:3000/');

    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');

    // Execute the one-liner as if pasted into console
    const result = await page.evaluate(async () => {
      // This simulates what a user would paste into browser console
      const { NearRpcClient, block, status, gasPrice } =
        await import('http://localhost:3000/browser-standalone.js');
      const client = new NearRpcClient('https://rpc.testnet.fastnear.com');

      // Test multiple RPC calls to ensure robustness
      const [blockResult, statusResult, gasPriceResult] = await Promise.all([
        block(client, { finality: 'final' }),
        status(client),
        gasPrice(client, {}),
      ]);

      return {
        blockHeight: blockResult.header.height,
        chainId: statusResult.chainId,
        gasPrice: gasPriceResult.gasPrice,
        allSuccess: true,
      };
    });

    // Verify multiple RPC calls worked
    expect(result).toHaveProperty('blockHeight');
    expect(result).toHaveProperty('chainId', 'testnet');
    expect(result).toHaveProperty('gasPrice');
    expect(result).toHaveProperty('allSuccess', true);
    expect(typeof result.blockHeight).toBe('number');
    expect(typeof result.gasPrice).toBe('string');
  });

  test('should handle errors gracefully in one-liner', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Test error handling with invalid endpoint
    const result = await page.evaluate(async () => {
      try {
        const { NearRpcClient, block } =
          await import('http://localhost:3000/browser-standalone.js');
        const client = new NearRpcClient(
          'https://invalid-endpoint.example.com'
        );
        await block(client, { finality: 'final' });
        return { success: false, error: 'Should have thrown' };
      } catch (error) {
        return {
          success: true,
          errorHandled: true,
          errorMessage: error.message || 'Unknown error',
        };
      }
    });

    expect(result).toHaveProperty('success', true);
    expect(result).toHaveProperty('errorHandled', true);
    expect(result).toHaveProperty('errorMessage');
    expect(typeof result.errorMessage).toBe('string');
  });

  test('should work with different RPC methods in one-liner style', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/');

    // Test various RPC methods that can be called in one-liner style
    const result = await page.evaluate(async () => {
      const { NearRpcClient, block, status, gasPrice, viewAccount } =
        await import('http://localhost:3000/browser-standalone.js');
      const client = new NearRpcClient('https://rpc.testnet.fastnear.com');

      // Get latest block for height
      const latestBlock = await block(client, { finality: 'final' });
      const targetHeight = latestBlock.header.height - 10;

      // Test different method signatures
      const results = await Promise.allSettled([
        block(client, { blockId: targetHeight }),
        status(client),
        gasPrice(client, {}),
        viewAccount(client, {
          accountId: 'example.testnet',
          finality: 'final',
        }),
      ]);

      return {
        blockQuery: results[0].status === 'fulfilled',
        statusQuery: results[1].status === 'fulfilled',
        gasPriceQuery: results[2].status === 'fulfilled',
        accountQuery: results[3].status === 'fulfilled',
        allSuccessful: results.every(r => r.status === 'fulfilled'),
      };
    });

    expect(result).toHaveProperty('blockQuery', true);
    expect(result).toHaveProperty('statusQuery', true);
    expect(result).toHaveProperty('gasPriceQuery', true);
    expect(result).toHaveProperty('accountQuery', true);
    expect(result).toHaveProperty('allSuccessful', true);
  });
});

test.describe('NEAR RPC One-Liner Mini Bundle Tests', () => {
  test('should work as one-liner with mini bundle from local server', async ({
    page,
  }) => {
    // Serve from the local origin so cross-origin/opaque-origin module
    // imports are allowed (modern Chromium blocks http imports from about:blank)
    await page.goto('http://localhost:3000/');

    // Execute the one-liner using the local mini bundle
    const result = await page.evaluate(async () => {
      const { NearRpcClient, block } =
        await import('http://localhost:3000/browser-standalone.min.js');
      const client = new NearRpcClient({
        endpoint: 'https://rpc.testnet.fastnear.com',
      });
      const blockResult = await block(client, { finality: 'final' });
      return {
        height: blockResult.header.height,
        hash: blockResult.header.hash,
        success: true,
      };
    });

    // Verify the result
    expect(result).toHaveProperty('height');
    expect(result).toHaveProperty('hash');
    expect(result).toHaveProperty('success', true);
    expect(typeof result.height).toBe('number');
    expect(typeof result.hash).toBe('string');
    expect(result.height).toBeGreaterThan(0);
    // NEAR block hashes are base58-encoded 32-byte values (43-44 chars)
    expect(result.hash).toMatch(/^[1-9A-HJ-NP-Za-km-z]{43,44}$/);
  });

  test('should work with mini bundle via data URL', async ({ page }) => {
    // Go to any page
    await page.goto('http://localhost:3000/');

    // Read the local mini bundle and create a data URL
    const { readFileSync } = await import('fs');
    const { join } = await import('path');
    const bundlePath = join(
      process.cwd(),
      'packages/jsonrpc-client/dist/browser-standalone.min.js'
    );
    const bundleContent = readFileSync(bundlePath, 'utf8');
    const dataUrl = `data:text/javascript;base64,${Buffer.from(bundleContent).toString('base64')}`;

    // Execute using the data URL (simulates the one-liner but with local mini bundle)
    const result = await page.evaluate(async bundleDataUrl => {
      const { NearRpcClient, block } = await import(bundleDataUrl);
      const client = new NearRpcClient({
        endpoint: 'https://rpc.testnet.fastnear.com',
      });
      const blockResult = await block(client, { finality: 'final' });
      return {
        height: blockResult.header.height,
        hash: blockResult.header.hash,
        timestamp: blockResult.header.timestamp,
        success: true,
      };
    }, dataUrl);

    // Verify the result
    expect(result).toHaveProperty('height');
    expect(result).toHaveProperty('hash');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('success', true);
    expect(typeof result.height).toBe('number');
    expect(typeof result.hash).toBe('string');
    expect(typeof result.timestamp).toBe('number');
    expect(result.height).toBeGreaterThan(0);
  });

  test('should work when pasted into any website console with mini bundle', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === 'webkit',
      'WebKit blocks cross-origin dynamic imports stricter than other browsers'
    );
    // Simulate a real third-party website by loading a different origin
    // (127.0.0.1 vs localhost) and importing the bundle cross-origin via CORS.
    // Modern Chromium blocks module imports from opaque origins (e.g. data: or
    // about:blank), so an opaque-origin page is not a realistic console paste.
    await page.goto('http://127.0.0.1:3000/');

    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');

    // Execute the one-liner as if pasted into console with mini bundle
    const result = await page.evaluate(async () => {
      // This simulates what a user would paste into browser console with mini bundle
      const { NearRpcClient, block, status, gasPrice } =
        await import('http://localhost:3000/browser-standalone.min.js');
      const client = new NearRpcClient({
        endpoint: 'https://rpc.testnet.fastnear.com',
      });

      // Test multiple RPC calls to ensure robustness
      const [blockResult, statusResult, gasPriceResult] = await Promise.all([
        block(client, { finality: 'final' }),
        status(client),
        gasPrice(client, {}),
      ]);

      return {
        blockHeight: blockResult.header.height,
        chainId: statusResult.chainId,
        gasPrice: gasPriceResult.gasPrice,
        allSuccess: true,
      };
    });

    // Verify multiple RPC calls worked
    expect(result).toHaveProperty('blockHeight');
    expect(result).toHaveProperty('chainId', 'testnet');
    expect(result).toHaveProperty('gasPrice');
    expect(result).toHaveProperty('allSuccess', true);
    expect(typeof result.blockHeight).toBe('number');
    expect(typeof result.gasPrice).toBe('string');
  });

  test('should handle errors gracefully in mini bundle one-liner', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/');

    // Test error handling with invalid endpoint
    const result = await page.evaluate(async () => {
      try {
        const { NearRpcClient, block } =
          await import('http://localhost:3000/browser-standalone.min.js');
        const client = new NearRpcClient({
          endpoint: 'https://invalid-endpoint.example.com',
        });
        await block(client, { finality: 'final' });
        return { success: false, error: 'Should have thrown' };
      } catch (error) {
        return {
          success: true,
          errorHandled: true,
          errorMessage: error.message || 'Unknown error',
        };
      }
    });

    expect(result).toHaveProperty('success', true);
    expect(result).toHaveProperty('errorHandled', true);
    expect(result).toHaveProperty('errorMessage');
    expect(typeof result.errorMessage).toBe('string');
  });

  test('should work with different RPC methods in mini bundle one-liner style', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/');

    // Test various RPC methods that can be called in one-liner style with mini bundle
    const result = await page.evaluate(async () => {
      const { NearRpcClient, block, status, gasPrice, viewAccount } =
        await import('http://localhost:3000/browser-standalone.min.js');
      const client = new NearRpcClient({
        endpoint: 'https://rpc.testnet.fastnear.com',
      });

      // Get latest block for height
      const latestBlock = await block(client, { finality: 'final' });
      const targetHeight = latestBlock.header.height - 10;

      // Test different method signatures
      const results = await Promise.allSettled([
        block(client, { blockId: targetHeight }),
        status(client),
        gasPrice(client, {}),
        viewAccount(client, {
          accountId: 'example.testnet',
          finality: 'final',
        }),
      ]);

      return {
        blockQuery: results[0].status === 'fulfilled',
        statusQuery: results[1].status === 'fulfilled',
        gasPriceQuery: results[2].status === 'fulfilled',
        accountQuery: results[3].status === 'fulfilled',
        allSuccessful: results.every(r => r.status === 'fulfilled'),
      };
    });

    expect(result).toHaveProperty('blockQuery', true);
    expect(result).toHaveProperty('statusQuery', true);
    expect(result).toHaveProperty('gasPriceQuery', true);
    expect(result).toHaveProperty('accountQuery', true);
    expect(result).toHaveProperty('allSuccessful', true);
  });

  test('should validate schemas correctly with zod/mini functions', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/');

    // Test that both regular and minified bundles work with zod/mini schema functions
    const result = await page.evaluate(async () => {
      const [regular, minified] = await Promise.all([
        import('http://localhost:3000/browser-standalone.js'),
        import('http://localhost:3000/browser-standalone.min.js'),
      ]);

      // Test that both can validate the same request using zod/mini function pattern
      const testRequest = {
        jsonrpc: '2.0' as const,
        id: 'test-123',
        method: 'status',
      };

      try {
        const regularValidated = regular
          .JsonRpcRequestSchema()
          .parse(testRequest);
        const minifiedValidated = minified
          .JsonRpcRequestSchema()
          .parse(testRequest);

        return {
          regularWorks: regularValidated.jsonrpc === '2.0',
          minifiedWorks: minifiedValidated.jsonrpc === '2.0',
          bothWork: true,
          regularClient: typeof regular.NearRpcClient === 'function',
          minifiedClient: typeof minified.NearRpcClient === 'function',
        };
      } catch (error) {
        return {
          error: error.message,
          bothWork: false,
        };
      }
    });

    expect(result).toHaveProperty('regularWorks', true);
    expect(result).toHaveProperty('minifiedWorks', true);
    expect(result).toHaveProperty('bothWork', true);
    expect(result).toHaveProperty('regularClient', true);
    expect(result).toHaveProperty('minifiedClient', true);
  });
});
