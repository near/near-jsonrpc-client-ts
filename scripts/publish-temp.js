#!/usr/bin/env node

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  cpSync,
  rmSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const tempDir = join(rootDir, 'temp-publish');

// Clean temp directory
try {
  rmSync(tempDir, { recursive: true, force: true });
} catch (e) {
  // Ignore if doesn't exist
}

console.log('🚀 Creating test packages for local testing...');

// Step 1: Build original packages first
console.log('\n🔨 Building original packages...');
try {
  execSync('pnpm build', { cwd: rootDir, stdio: 'inherit' });
  console.log('✅ Original packages built successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Create temp directory
mkdirSync(tempDir, { recursive: true });

// Step 2: Copy built packages for testing
console.log('\n📦 Copying packages for testing...');

// Copy jsonrpc-types package
const typesSource = join(rootDir, 'packages/jsonrpc-types');
const typesDest = join(tempDir, 'jsonrpc-types');
cpSync(typesSource, typesDest, { recursive: true });

// Copy jsonrpc-client package
const clientSource = join(rootDir, 'packages/jsonrpc-client');
const clientDest = join(tempDir, 'jsonrpc-client');
cpSync(clientSource, clientDest, { recursive: true });

// Step 3: Update package.json files for local testing
console.log('\n📝 Updating package.json files for testing...');

// Update types package.json
const typesPackageJson = JSON.parse(
  readFileSync(join(typesDest, 'package.json'), 'utf8')
);

// Ensure repository field is set correctly
typesPackageJson.repository = {
  type: 'git',
  url: 'https://github.com/near/near-jsonrpc-client-ts.git',
  directory: 'packages/jsonrpc-types',
};

writeFileSync(
  join(typesDest, 'package.json'),
  JSON.stringify(typesPackageJson, null, 2)
);
console.log('✅ Updated @near-js/jsonrpc-types package.json');

// Update client package.json
const clientPackageJson = JSON.parse(
  readFileSync(join(clientDest, 'package.json'), 'utf8')
);

// Ensure repository field is set correctly
clientPackageJson.repository = {
  type: 'git',
  url: 'https://github.com/near/near-jsonrpc-client-ts.git',
  directory: 'packages/jsonrpc-client',
};

// Fix workspace dependencies to use actual versions
if (clientPackageJson.dependencies) {
  for (const [dep, version] of Object.entries(clientPackageJson.dependencies)) {
    if (version === 'workspace:*') {
      // Get the actual version from the types package
      if (dep === '@near-js/jsonrpc-types') {
        clientPackageJson.dependencies[dep] = `^${typesPackageJson.version}`;
      }
      // Note: If other workspace dependencies are added in the future,
      // they should be handled here with their actual versions
    }
  }
}

writeFileSync(
  join(clientDest, 'package.json'),
  JSON.stringify(clientPackageJson, null, 2)
);
console.log('✅ Updated @near-js/jsonrpc-client package.json');

console.log('\n✅ Test packages ready!');
console.log('\n📤 To publish to npm (when ready):');
console.log(`cd ${typesDest} && npm publish --access public`);
console.log(`cd ${clientDest} && npm publish --access public`);

console.log(
  '\n🌐 After publishing, the browser standalone bundle will be available at:'
);
console.log(
  'https://unpkg.com/@near-js/jsonrpc-client@latest/dist/browser-standalone.js'
);

console.log('\n🧪 To test locally:');
console.log(`cd ${clientDest} && python3 -m http.server 8000`);
console.log('Then test: http://localhost:8000/dist/browser-standalone.js');

console.log('\n📦 To test with npm link:');
console.log(`cd ${typesDest} && npm link`);
console.log(`cd ${clientDest} && npm link @near-js/jsonrpc-types && npm link`);
console.log('Then in your test project: npm link @near-js/jsonrpc-client');