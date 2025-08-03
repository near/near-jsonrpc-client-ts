// Test using validated imports instead of enableValidation
import { describe, it, expect } from 'vitest';
import { NearRpcClient } from '../client';
import * as validated from '../validated';
import * as noValidation from '../no-validation';

describe('Validated vs No-Validation Imports', () => {
  const mockClient = new NearRpcClient({
    endpoint: 'https://rpc.mainnet.fastnear.com',
  });

  describe('Validated imports have validation built-in', () => {
    it('should export all RPC methods from validated', () => {
      // Check that validated exports include common methods
      expect(typeof validated.status).toBe('function');
      expect(typeof validated.block).toBe('function');
      expect(typeof validated.viewAccount).toBe('function');
      expect(typeof validated.viewFunction).toBe('function');
      expect(typeof validated.viewAccessKey).toBe('function');
      expect(typeof validated.query).toBe('function');
      expect(typeof validated.tx).toBe('function');
      expect(typeof validated.validators).toBe('function');
    });

    it('should export enableValidation as no-op in validated', () => {
      // validated exports have validation built-in, so enableValidation is a no-op
      expect(typeof validated.enableValidation).toBe('function');
      expect(validated.enableValidation()).toBeUndefined();
    });
  });

  describe('No-validation imports skip validation', () => {
    it('should export all RPC methods from no-validation', () => {
      // Check that no-validation exports include common methods
      expect(typeof noValidation.status).toBe('function');
      expect(typeof noValidation.block).toBe('function');
      expect(typeof noValidation.viewAccount).toBe('function');
      expect(typeof noValidation.viewFunction).toBe('function');
      expect(typeof noValidation.viewAccessKey).toBe('function');
      expect(typeof noValidation.query).toBe('function');
      expect(typeof noValidation.tx).toBe('function');
      expect(typeof noValidation.validators).toBe('function');
    });

    it('should export enableValidation as no-op in no-validation', () => {
      // no-validation exports skip validation, so enableValidation is a no-op
      expect(typeof noValidation.enableValidation).toBe('function');
      expect(noValidation.enableValidation()).toBeUndefined();
    });
  });

  describe('Usage patterns', () => {
    it('should demonstrate modern import pattern', async () => {
      // Modern pattern - use validated imports
      const { viewAccount: validatedViewAccount } = validated;
      const { viewAccount: noValidationViewAccount } = noValidation;

      // Both can be used with the same client
      expect(typeof validatedViewAccount).toBe('function');
      expect(typeof noValidationViewAccount).toBe('function');
    });

    it('should not require enableValidation for validated imports', () => {
      // The old pattern (deprecated):
      // const validation = enableValidation();
      // const client = new NearRpcClient({ endpoint: '...', validation });

      // The new pattern (recommended):
      // Just import from validated or no-validation
      expect(validated.status).toBeDefined();
      expect(noValidation.status).toBeDefined();
    });
  });

  describe('Convenience function coverage', () => {
    it('should cover all convenience functions in validated', () => {
      // These are re-exported from convenience.ts with validation
      expect(validated.viewAccount).toBeDefined();
      expect(validated.viewFunction).toBeDefined();
      expect(validated.viewAccessKey).toBeDefined();
    });

    it('should cover all convenience functions in no-validation', () => {
      // These are re-exported from convenience.ts without validation
      expect(noValidation.viewAccount).toBeDefined();
      expect(noValidation.viewFunction).toBeDefined();
      expect(noValidation.viewAccessKey).toBeDefined();
    });
  });
});
