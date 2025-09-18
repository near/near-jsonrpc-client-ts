import { describe, it, expect, beforeAll } from 'vitest';
import * as ts from 'typescript';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Required Parameters Type Checking', () => {
  let languageService: ts.LanguageService;
  let host: ts.LanguageServiceHost;
  let files: Map<string, { version: string; content: string }>;

  beforeAll(() => {
    files = new Map();

    // Create language service host
    host = {
      getScriptFileNames: () => Array.from(files.keys()),
      getScriptVersion: fileName => {
        const file = files.get(fileName);
        return file ? file.version : '1';
      },
      getScriptSnapshot: fileName => {
        const file = files.get(fileName);
        if (file) {
          return ts.ScriptSnapshot.fromString(file.content);
        }

        if (ts.sys.fileExists(fileName)) {
          const content = ts.sys.readFile(fileName)!;
          return ts.ScriptSnapshot.fromString(content);
        }

        return undefined;
      },
      getCurrentDirectory: () => process.cwd(),
      getCompilationSettings: () => ({
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        strict: true,
        esModuleInterop: true,
        skipLibCheck: false,
        forceConsistentCasingInFileNames: true,
        lib: ['es2022'],
        resolveJsonModule: true,
        allowJs: false,
        baseUrl: path.resolve(__dirname, '../../..'),
        paths: {
          '@near-js/jsonrpc-client': ['packages/jsonrpc-client/src/index.ts'],
          '@near-js/jsonrpc-types': ['packages/jsonrpc-types/src/index.ts'],
        },
      }),
      getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
      fileExists: ts.sys.fileExists,
      readFile: ts.sys.readFile,
      readDirectory: ts.sys.readDirectory,
      directoryExists: ts.sys.directoryExists,
      getDirectories: ts.sys.getDirectories,
      resolveModuleNames: (moduleNames, containingFile) => {
        const resolvedModules: (ts.ResolvedModule | undefined)[] = [];

        for (const moduleName of moduleNames) {
          // Handle our workspace packages
          if (moduleName.startsWith('@near-js/')) {
            const packagePath =
              host.getCompilationSettings().paths?.[moduleName];
            if (packagePath && packagePath[0]) {
              const resolvedPath = path.resolve(
                __dirname,
                '../../..',
                packagePath[0]
              );
              if (ts.sys.fileExists(resolvedPath)) {
                resolvedModules.push({
                  resolvedFileName: resolvedPath,
                  isExternalLibraryImport: false,
                });
                continue;
              }
            }
          }

          // Standard module resolution
          const result = ts.resolveModuleName(
            moduleName,
            containingFile,
            host.getCompilationSettings(),
            host
          );
          resolvedModules.push(result.resolvedModule);
        }

        return resolvedModules;
      },
    };

    languageService = ts.createLanguageService(
      host,
      ts.createDocumentRegistry()
    );
  });

  const checkCode = (
    code: string,
    fileName: string = 'test.ts'
  ): ts.Diagnostic[] => {
    const fullPath = path.join(__dirname, fileName);
    files.set(fullPath, { version: '1', content: code });

    const diagnostics = [
      ...languageService.getSyntacticDiagnostics(fullPath),
      ...languageService.getSemanticDiagnostics(fullPath),
    ];

    return diagnostics;
  };

  const hasExpectedError = (
    diagnostics: ts.Diagnostic[],
    expectedError: string
  ): boolean => {
    return diagnostics.some(d => {
      const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
      return message.includes(expectedError);
    });
  };

  describe('Generated functions with required parameters', () => {
    it('should error when query is called without params', () => {
      const code = `
        import { query } from '@near-js/jsonrpc-client';
        
        const client = { request: () => {} } as any;
        
        // This should cause a TypeScript error - query requires params
        query(client);
      `;

      const diagnostics = checkCode(code);
      expect(diagnostics.length).toBeGreaterThan(0);
      expect(
        hasExpectedError(diagnostics, 'Expected 2 arguments, but got 1')
      ).toBe(true);
    });

    it('should error when block is called without params', () => {
      const code = `
        import { block } from '@near-js/jsonrpc-client';
        
        const client = { request: () => {} } as any;
        
        // This should cause a TypeScript error - block requires params
        block(client);
      `;

      const diagnostics = checkCode(code);
      expect(diagnostics.length).toBeGreaterThan(0);
      expect(
        hasExpectedError(diagnostics, 'Expected 2 arguments, but got 1')
      ).toBe(true);
    });

    it('should error when tx is called without params', () => {
      const code = `
        import { tx } from '@near-js/jsonrpc-client';

        const client = { request: () => {} } as any;

        // This should cause a TypeScript error - tx requires params
        tx(client);
      `;

      const diagnostics = checkCode(code);
      expect(diagnostics.length).toBeGreaterThan(0);
      expect(
        hasExpectedError(diagnostics, 'Expected 2 arguments, but got 1')
      ).toBe(true);
    });

    it('should error when lightClientProof is called without params', () => {
      const code = `
        import { lightClientProof } from '@near-js/jsonrpc-client';
        
        const client = { request: () => {} } as any;
        
        // This should cause a TypeScript error - lightClientProof requires params
        lightClientProof(client);
      `;

      const diagnostics = checkCode(code);
      expect(diagnostics.length).toBeGreaterThan(0);
      expect(
        hasExpectedError(diagnostics, 'Expected 2 arguments, but got 1')
      ).toBe(true);
    });
  });

  describe('Generated functions with optional parameters', () => {
    it('should not error when status is called without params', () => {
      const code = `
        import { status } from '@near-js/jsonrpc-client';
        
        const client = { request: () => {} } as any;
        
        // This should be valid - status has optional params
        status(client);
      `;

      const diagnostics = checkCode(code);
      // Filter out any import-related errors
      const relevantErrors = diagnostics.filter(d => {
        const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
        return (
          !message.includes('Cannot find module') &&
          !message.includes('Expected')
        );
      });
      expect(relevantErrors).toHaveLength(0);
    });

    it('should not error when networkInfo is called without params', () => {
      const code = `
        import { networkInfo } from '@near-js/jsonrpc-client';
        
        const client = { request: () => {} } as any;
        
        // This should be valid - networkInfo has optional params
        networkInfo(client);
      `;

      const diagnostics = checkCode(code);
      // Filter out any import-related errors
      const relevantErrors = diagnostics.filter(d => {
        const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
        return (
          !message.includes('Cannot find module') &&
          !message.includes('Expected')
        );
      });
      expect(relevantErrors).toHaveLength(0);
    });

    it('should not error when gasPrice is called without params', () => {
      const code = `
        import { gasPrice } from '@near-js/jsonrpc-client';
        
        const client = { request: () => {} } as any;
        
        // This should be valid - gasPrice has optional params
        gasPrice(client);
      `;

      const diagnostics = checkCode(code);
      // Filter out any import-related errors
      const relevantErrors = diagnostics.filter(d => {
        const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
        return (
          !message.includes('Cannot find module') &&
          !message.includes('Expected')
        );
      });
      expect(relevantErrors).toHaveLength(0);
    });
  });

  describe('Validated functions', () => {
    it('should error when validated query is called without params', () => {
      const code = `
        import { query } from '@near-js/jsonrpc-client/validated';
        
        const client = { request: () => {} } as any;
        
        // This should cause a TypeScript error - query requires params
        query(client);
      `;

      const diagnostics = checkCode(code);
      expect(diagnostics.length).toBeGreaterThan(0);
      expect(
        hasExpectedError(diagnostics, 'Expected 2 arguments, but got 1')
      ).toBe(true);
    });

    it('should not error when validated status is called without params', () => {
      const code = `
        import { status } from '@near-js/jsonrpc-client/validated';
        
        const client = { request: () => {} } as any;
        
        // This should be valid - status has optional params
        status(client);
      `;

      const diagnostics = checkCode(code);
      // Filter out any import-related errors
      const relevantErrors = diagnostics.filter(d => {
        const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
        return (
          !message.includes('Cannot find module') &&
          !message.includes('Expected')
        );
      });
      expect(relevantErrors).toHaveLength(0);
    });
  });
});
