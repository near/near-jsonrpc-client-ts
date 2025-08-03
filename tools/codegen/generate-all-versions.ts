#!/usr/bin/env tsx

/**
 * Generates TypeScript code for all discovered OpenAPI spec versions
 * This script runs the existing generator for each version and organizes the output
 */

import {
  readFileSync,
  existsSync,
  mkdirSync,
  cpSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import type { VersionManifest } from './fetch-all-versions';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '../..');

// Read the manifest
const manifestPath = join(__dirname, 'openapi-versions/manifest.json');
if (!existsSync(manifestPath)) {
  console.error('No manifest.json found. Run fetch-all-versions.ts first.');
  process.exit(1);
}

const manifest: VersionManifest = JSON.parse(
  readFileSync(manifestPath, 'utf8')
);

/**
 * Generate code for a specific version
 */
async function generateForVersion(version: string, specPath: string) {
  console.log(`\n=== Generating code for version ${version} ===`);

  // Run the generator with the spec path as argument
  console.log('  → Running generator...');
  execSync(`npx tsx generate.ts "${specPath}"`, {
    cwd: __dirname,
    stdio: 'inherit',
  });

  // Move generated files to version-specific directories
  const versionDir = version === 'latest' ? 'latest' : `v${version}`;
  await moveGeneratedFiles(versionDir);

  console.log(`  ✓ Generated code for version ${version}`);
}

/**
 * Move generated files to version-specific directories
 */
async function moveGeneratedFiles(versionDir: string) {
  // Define source and destination paths
  const moves = [
    // Types package
    {
      from: join(ROOT_DIR, 'packages/jsonrpc-types/src/types.ts'),
      to: join(ROOT_DIR, 'packages/jsonrpc-types/src', versionDir, 'types.ts'),
    },
    {
      from: join(ROOT_DIR, 'packages/jsonrpc-types/src/schemas.ts'),
      to: join(
        ROOT_DIR,
        'packages/jsonrpc-types/src',
        versionDir,
        'schemas.ts'
      ),
    },
    {
      from: join(ROOT_DIR, 'packages/jsonrpc-types/src/methods.ts'),
      to: join(
        ROOT_DIR,
        'packages/jsonrpc-types/src',
        versionDir,
        'methods.ts'
      ),
    },
    // Client package
    {
      from: join(ROOT_DIR, 'packages/jsonrpc-client/src/generated-types.ts'),
      to: join(
        ROOT_DIR,
        'packages/jsonrpc-client/src',
        versionDir,
        'generated-types.ts'
      ),
    },
    {
      from: join(
        ROOT_DIR,
        'packages/jsonrpc-client/src/generated-functions.ts'
      ),
      to: join(
        ROOT_DIR,
        'packages/jsonrpc-client/src',
        versionDir,
        'generated-functions.ts'
      ),
    },
    {
      from: join(ROOT_DIR, 'packages/jsonrpc-client/src/validated/index.ts'),
      to: join(
        ROOT_DIR,
        'packages/jsonrpc-client/src',
        versionDir,
        'validated/index.ts'
      ),
    },
  ];

  // Create directories and move files
  for (const move of moves) {
    const dir = dirname(move.to);
    mkdirSync(dir, { recursive: true });

    if (existsSync(move.from)) {
      cpSync(move.from, move.to, { force: true });
      console.log(`    Moved ${move.from.split('/').pop()} → ${versionDir}/`);
    }
  }

  // Create index files for this version
  await createVersionIndexFiles(versionDir);

  // Fix the generated files for version-specific directories
  await fixGeneratedFiles(versionDir);
}

/**
 * Fix generated files for version-specific directories
 */
async function fixGeneratedFiles(versionDir: string) {
  // Fix generated-functions.ts to not re-export convenience functions
  const genFunctionsPath = join(
    ROOT_DIR,
    'packages/jsonrpc-client/src',
    versionDir,
    'generated-functions.ts'
  );
  if (existsSync(genFunctionsPath)) {
    let content = readFileSync(genFunctionsPath, 'utf8');
    // Remove the convenience function exports
    content = content.replace(
      /\/\/ Re-export convenience functions\nexport \{ viewAccount, viewFunction, viewAccessKey \} from '\.\/convenience';/,
      ''
    );
    writeFileSync(genFunctionsPath, content);
  }

  // Fix generated-types.ts to import client from correct path
  const genTypesPath = join(
    ROOT_DIR,
    'packages/jsonrpc-client/src',
    versionDir,
    'generated-types.ts'
  );
  if (existsSync(genTypesPath)) {
    let content = readFileSync(genTypesPath, 'utf8');
    // Fix the client import path
    content = content.replace(/from '\.\/client'/g, "from '../client'");
    writeFileSync(genTypesPath, content);
  }

  // Fix validated/index.ts to import client from correct path
  const validatedPath = join(
    ROOT_DIR,
    'packages/jsonrpc-client/src',
    versionDir,
    'validated/index.ts'
  );
  if (existsSync(validatedPath)) {
    let content = readFileSync(validatedPath, 'utf8');
    // Fix the client import path for version-specific directories
    content = content.replace(
      /from '\.\.\/client\.js'/g,
      "from '../../client.js'"
    );
    writeFileSync(validatedPath, content);
  }
}

/**
 * Create index files for a version
 */
async function createVersionIndexFiles(versionDir: string) {
  // Types package index
  const typesIndexPath = join(
    ROOT_DIR,
    'packages/jsonrpc-types/src',
    versionDir,
    'index.ts'
  );
  const typesIndexContent = `// Auto-generated types for version ${versionDir}
export * from './types';
export * from './schemas';
export * from './methods';
`;
  writeFileSync(typesIndexPath, typesIndexContent);

  // Create version-specific convenience file with only JSON parsing utilities
  const conveniencePath = join(
    ROOT_DIR,
    'packages/jsonrpc-client/src',
    versionDir,
    'convenience.ts'
  );
  const convenienceContent = `// JSON parsing utilities for version ${versionDir}
import type { CallResult } from '@near-js/jsonrpc-types';
import { query } from './generated-types';
import type { NearRpcClient } from '../client';

export function parseCallResultToJson<T = unknown>(callResult: CallResult): T {
  const bytes = new Uint8Array(callResult.result);
  const text = new TextDecoder().decode(bytes);
  return JSON.parse(text) as T;
}

export async function viewFunctionAsJson<T = unknown>(
  client: NearRpcClient,
  params: {
    accountId: string;
    methodName: string;
    argsBase64?: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }
): Promise<T> {
  // Use query function directly
  const baseParams = {
    requestType: 'call_function' as const,
    accountId: params.accountId,
    methodName: params.methodName,
    argsBase64: params.argsBase64 ?? '',
  };

  const queryParams = params.blockId
    ? { ...baseParams, blockId: params.blockId }
    : { ...baseParams, finality: params.finality || ('final' as const) };

  const result = await query(client, queryParams) as CallResult;
  return parseCallResultToJson<T>(result);
}
`;
  writeFileSync(conveniencePath, convenienceContent);

  // Client package index
  const clientIndexPath = join(
    ROOT_DIR,
    'packages/jsonrpc-client/src',
    versionDir,
    'index.ts'
  );
  const clientIndexContent = `// Auto-generated client for version ${versionDir}
export { NearRpcClient } from '../client';
export type * from '../types';
// Export JSON parsing utilities
export { parseCallResultToJson, viewFunctionAsJson } from './convenience';
// Export types (but not functions which are exported from generated-functions)
export type * from './generated-types';
// Export all functions from generated-functions
export * from './generated-functions';
// Export validation-specific functions (viewAccount, viewFunction, viewAccessKey, enableValidation)
export { viewAccount, viewFunction, viewAccessKey, enableValidation } from './validated';
`;
  writeFileSync(clientIndexPath, clientIndexContent);

  // No-validation variant
  const noValidationDir = join(
    ROOT_DIR,
    'packages/jsonrpc-client/src',
    versionDir,
    'no-validation'
  );
  mkdirSync(noValidationDir, { recursive: true });

  const noValidationIndexPath = join(noValidationDir, 'index.ts');
  const noValidationIndexContent = `// Auto-generated no-validation client for version ${versionDir}
export { NearRpcClient } from '../../client';
export type * from '../../types';
// Export JSON parsing utilities
export { parseCallResultToJson, viewFunctionAsJson } from '../convenience';
// Export types (but not functions which are exported from generated-functions)
export type * from '../generated-types';
// Export all functions from generated-functions  
export * from '../generated-functions';
`;
  writeFileSync(noValidationIndexPath, noValidationIndexContent);
}

/**
 * Generate or update package.json exports
 */
async function updatePackageExports() {
  console.log('\n=== Updating package.json exports ===');

  // Update jsonrpc-types package.json
  const typesPackagePath = join(
    ROOT_DIR,
    'packages/jsonrpc-types/package.json'
  );
  const typesPackage = JSON.parse(readFileSync(typesPackagePath, 'utf8'));

  // Keep existing exports structure but add version-specific ones
  if (!typesPackage.exports) {
    typesPackage.exports = {};
  }

  // Add main export
  typesPackage.exports['.'] = {
    types: './dist/index.d.ts',
    import: './dist/index.mjs',
    require: './dist/index.js',
  };

  // Add version-specific exports
  for (const version of manifest.versions) {
    const versionKey =
      version.version === 'latest' ? './latest' : `./v${version.version}`;
    typesPackage.exports[versionKey] = {
      types: `./dist/${version.version === 'latest' ? 'latest' : `v${version.version}`}/index.d.ts`,
      import: `./dist/${version.version === 'latest' ? 'latest' : `v${version.version}`}/index.mjs`,
      require: `./dist/${version.version === 'latest' ? 'latest' : `v${version.version}`}/index.js`,
    };
  }

  writeFileSync(typesPackagePath, JSON.stringify(typesPackage, null, 2) + '\n');
  console.log('  ✓ Updated jsonrpc-types package.json');

  // Update jsonrpc-client package.json
  const clientPackagePath = join(
    ROOT_DIR,
    'packages/jsonrpc-client/package.json'
  );
  const clientPackage = JSON.parse(readFileSync(clientPackagePath, 'utf8'));

  // Keep existing exports but add version-specific ones
  for (const version of manifest.versions) {
    const versionKey =
      version.version === 'latest' ? './latest' : `./v${version.version}`;

    // Main version export
    clientPackage.exports[versionKey] = {
      types: `./dist/${version.version === 'latest' ? 'latest' : `v${version.version}`}/index.d.ts`,
      import: `./dist/${version.version === 'latest' ? 'latest' : `v${version.version}`}/index.mjs`,
      require: `./dist/${version.version === 'latest' ? 'latest' : `v${version.version}`}/index.js`,
    };

    // No-validation variant
    clientPackage.exports[`${versionKey}/no-validation`] = {
      types: `./dist/${version.version === 'latest' ? 'latest' : `v${version.version}`}/no-validation/index.d.ts`,
      import: `./dist/${version.version === 'latest' ? 'latest' : `v${version.version}`}/no-validation/index.mjs`,
      require: `./dist/${version.version === 'latest' ? 'latest' : `v${version.version}`}/no-validation/index.js`,
    };
  }

  writeFileSync(
    clientPackagePath,
    JSON.stringify(clientPackage, null, 2) + '\n'
  );
  console.log('  ✓ Updated jsonrpc-client package.json');
}

/**
 * Update tsup.config.ts files with version-specific entries
 */
async function updateTsupConfigs() {
  console.log('\n=== Updating tsup.config.ts files ===');

  // Update jsonrpc-types tsup.config.ts
  const typesTsupPath = join(ROOT_DIR, 'packages/jsonrpc-types/tsup.config.ts');
  let typesTsupContent = readFileSync(typesTsupPath, 'utf8');

  // Build the entry array for types
  const typesEntries = ['src/index.ts'];
  for (const version of manifest.versions) {
    const versionDir =
      version.version === 'latest' ? 'latest' : `v${version.version}`;
    typesEntries.push(`src/${versionDir}/index.ts`);
  }

  // Replace the entry array in the config
  typesTsupContent = typesTsupContent.replace(
    /entry:\s*\[[^\]]*\]/s,
    `entry: [\n    ${typesEntries.map(e => `'${e}'`).join(',\n    ')}\n  ]`
  );

  writeFileSync(typesTsupPath, typesTsupContent);
  console.log('  ✓ Updated jsonrpc-types/tsup.config.ts');

  // Update jsonrpc-client tsup.config.ts
  const clientTsupPath = join(
    ROOT_DIR,
    'packages/jsonrpc-client/tsup.config.ts'
  );
  let clientTsupContent = readFileSync(clientTsupPath, 'utf8');

  // Build the entry array for client
  const clientEntries = ['src/index.ts', 'src/no-validation/index.ts'];

  // Add version-specific entries
  for (const version of manifest.versions) {
    const versionDir =
      version.version === 'latest' ? 'latest' : `v${version.version}`;
    clientEntries.push(`src/${versionDir}/index.ts`);
    clientEntries.push(`src/${versionDir}/no-validation/index.ts`);
  }

  // Replace the entry array in the config
  clientTsupContent = clientTsupContent.replace(
    /entry:\s*\[[^\]]*\]/s,
    `entry: [\n    ${clientEntries.map(e => `'${e}'`).join(',\n    ')}\n  ]`
  );

  // Add comment to indicate it's auto-updated
  if (!clientTsupContent.includes('Version-specific entries')) {
    clientTsupContent = clientTsupContent.replace(
      "'src/no-validation/index.ts',",
      "'src/no-validation/index.ts',\n    // Version-specific entries"
    );
  }

  writeFileSync(clientTsupPath, clientTsupContent);
  console.log('  ✓ Updated jsonrpc-client/tsup.config.ts');
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Generating code for all OpenAPI spec versions...\n');

  // Generate code for each version
  for (const versionInfo of manifest.versions) {
    const specPath = join(__dirname, 'openapi-versions', versionInfo.specPath);

    if (!existsSync(specPath)) {
      console.error(`Spec file not found: ${specPath}`);
      continue;
    }

    await generateForVersion(versionInfo.version, specPath);
  }

  // Update package.json exports
  await updatePackageExports();

  // Update tsup.config.ts files
  await updateTsupConfigs();

  // Create root index files that point to latest
  await createRootIndexFiles();

  console.log('\n✅ All versions generated successfully!');
  console.log('\n📦 Available imports:');
  for (const version of manifest.versions) {
    const v = version.version === 'latest' ? 'latest' : `v${version.version}`;
    console.log(
      `  - import { NearRpcClient } from '@near-js/jsonrpc-client/${v}';`
    );
    console.log(
      `  - import { NearRpcClient } from '@near-js/jsonrpc-client/${v}/no-validation';`
    );
  }
}

/**
 * Create root index files that re-export from latest
 */
async function createRootIndexFiles() {
  // Update root types index to export from latest
  const typesRootIndex = join(ROOT_DIR, 'packages/jsonrpc-types/src/index.ts');
  const typesRootContent = `// Auto-generated - exports latest version
export * from './latest';
`;
  writeFileSync(typesRootIndex, typesRootContent);

  // Root index exports need to be handled carefully to avoid conflicts
  // The root files should remain as they were originally
}

// Run if called directly
if (import.meta.url.endsWith(process.argv[1])) {
  main().catch(console.error);
}
