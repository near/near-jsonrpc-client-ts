import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

describe('Tree-shaking Bundle Tests', () => {
  const distDir = path.join(__dirname, 'dist');

  beforeAll(() => {
    // Clean dist directory
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true });
    }

    // Build all bundles
    try {
      execSync('npm run build', { cwd: __dirname, stdio: 'pipe' });
      execSync('npm run build:min', { cwd: __dirname, stdio: 'pipe' });
      execSync('npm run build:validation', { cwd: __dirname, stdio: 'pipe' });
      execSync('npm run build:validation:min', {
        cwd: __dirname,
        stdio: 'pipe',
      });
      execSync('npx rollup -c rollup.no-validation.config.js', {
        cwd: __dirname,
        stdio: 'pipe',
      });
    } catch (error) {
      throw new Error(`Bundle creation failed: ${error}`);
    }
  });

  it('should create all expected bundles', () => {
    const expectedBundles = [
      'bundle.js',
      'bundle.min.js',
      'bundle-with-validation.js',
      'bundle-with-validation.min.js',
      'bundle-no-validation.js',
    ];

    for (const bundle of expectedBundles) {
      const bundlePath = path.join(distDir, bundle);
      expect(fs.existsSync(bundlePath)).toBe(true);
    }
  });

  it('should have appropriate bundle sizes', () => {
    const bundles = {
      'bundle-no-validation.js': { min: 5000, max: 15000 }, // ~7.4KB
      'bundle-with-validation.js': { min: 40000, max: 80000 }, // ~49KB with per-function validation
      'bundle.js': { min: 40000, max: 70000 }, // ~56KB
    };

    for (const [bundle, limits] of Object.entries(bundles)) {
      const bundlePath = path.join(distDir, bundle);
      const stats = fs.statSync(bundlePath);
      expect(stats.size).toBeGreaterThan(limits.min);
      expect(stats.size).toBeLessThan(limits.max);
    }
  });

  it('no-validation bundle should not contain any validation schemas', () => {
    const bundlePath = path.join(distDir, 'bundle-no-validation.js');
    const content = fs.readFileSync(bundlePath, 'utf-8');

    // Check that validation-specific schemas are NOT in the bundle
    const schemasToExclude = [
      'BlockRequestSchema',
      'BlockResponseSchema',
      'StatusRequestSchema',
      'StatusResponseSchema',
      'QueryRequestSchema',
      'QueryResponseSchema',
      'VALIDATION_SCHEMA_MAP',
      'AccountViewResponseSchema',
      'AccessKeyViewResponseSchema',
      'ContractCodeViewResponseSchema',
      'ContractStateViewResponseSchema',
    ];

    for (const schema of schemasToExclude) {
      expect(content).not.toContain(schema);
    }

    // Should not contain Zod validation code
    expect(content).not.toContain('ZodError');
    expect(content).not.toContain('.parse(');
    expect(content).not.toContain('.safeParse(');
  });

  it('validation bundle should only contain schemas for used functions', () => {
    const bundlePath = path.join(distDir, 'bundle-with-validation.js');
    const content = fs.readFileSync(bundlePath, 'utf-8');

    // Should contain schemas for block (directly used) and query (used by viewAccount)
    expect(content).toContain('RpcBlockRequestSchema');
    expect(content).toContain('RpcBlockResponseSchema');
    expect(content).toContain('RpcQueryRequestSchema');
    expect(content).toContain('RpcQueryResponseSchema');

    // Should NOT contain schemas for unused functions
    const unusedSchemas = [
      'StatusRequestSchema',
      'StatusResponseSchema',
      'ChunkRequestSchema',
      'ChunkResponseSchema',
      'TxRequestSchema',
      'TxResponseSchema',
      'ValidatorsRequestSchema',
      'ValidatorsResponseSchema',
      'ChangesRequestSchema',
      'ChangesResponseSchema',
      'VALIDATION_SCHEMA_MAP', // Should never be in any bundle
    ];

    for (const schema of unusedSchemas) {
      expect(content).not.toContain(schema);
    }
  });

  it('regular bundle should only contain schemas for used functions', () => {
    const bundlePath = path.join(distDir, 'bundle.js');
    const content = fs.readFileSync(bundlePath, 'utf-8');

    // main.ts uses status, so it should contain StatusResponse schema
    expect(content).toContain('RpcStatusResponseSchema');

    // Should NOT contain schemas for unused functions
    const unusedSchemas = [
      'BlockRequestSchema',
      'BlockResponseSchema',
      'QueryRequestSchema',
      'QueryResponseSchema',
      'ChunkRequestSchema',
      'ChunkResponseSchema',
      'VALIDATION_SCHEMA_MAP', // Should never be in any bundle
    ];

    for (const schema of unusedSchemas) {
      expect(content).not.toContain(schema);
    }
  });

  it('validation bundle should contain Zod validation code', () => {
    const bundlePath = path.join(distDir, 'bundle-with-validation.js');
    const content = fs.readFileSync(bundlePath, 'utf-8');

    // Should contain Zod validation functionality
    expect(content).toContain('ZodError');
    expect(content).toContain('.parse(');
  });

  it('minified bundles should be smaller than unminified', () => {
    const pairs = [
      ['bundle.js', 'bundle.min.js'],
      ['bundle-with-validation.js', 'bundle-with-validation.min.js'],
    ];

    for (const [unminified, minified] of pairs) {
      const unminifiedPath = path.join(distDir, unminified);
      const minifiedPath = path.join(distDir, minified);

      const unminifiedSize = fs.statSync(unminifiedPath).size;
      const minifiedSize = fs.statSync(minifiedPath).size;

      expect(minifiedSize).toBeLessThan(unminifiedSize);
      // Minified should be at least 30% smaller
      expect(minifiedSize).toBeLessThan(unminifiedSize * 0.7);
    }
  });

  it('all bundles should export expected functions', () => {
    const bundles = [
      'bundle.js',
      'bundle-with-validation.js',
      'bundle-no-validation.js',
    ];

    for (const bundle of bundles) {
      const bundlePath = path.join(distDir, bundle);
      const content = fs.readFileSync(bundlePath, 'utf-8');

      // Should export the functions we're using in the examples
      // main.ts uses status, main-with-validation.ts uses block and viewAccount
      if (bundle === 'bundle.js') {
        expect(content).toContain('status');
      } else {
        expect(content).toContain('block');
        expect(content).toContain('viewAccount');
      }
      expect(content).toContain('NearRpcClient');
    }
  });
});
