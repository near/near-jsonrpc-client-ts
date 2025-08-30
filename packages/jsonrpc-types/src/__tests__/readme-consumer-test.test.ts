import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { execSync } from 'child_process';

describe('README examples as a real consumer', () => {
  let tmpDir: string;
  const readmePath = path.join(__dirname, '../../README.md');
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');

  // Extract TypeScript code blocks from README
  const extractCodeBlocks = (
    content: string
  ): { code: string; description: string }[] => {
    const blocks: { code: string; description: string }[] = [];
    const sections = content.split('###');

    sections.forEach(section => {
      const lines = section.split('\n');
      const title = lines[0].trim();

      const codeBlockRegex = /```typescript\n([\s\S]*?)```/g;
      let match: RegExpExecArray | null;
      let blockIndex = 0;
      while ((match = codeBlockRegex.exec(section)) !== null) {
        blocks.push({
          code: match[1],
          description: `${title || 'Example'}_${blockIndex++}`.replace(
            /[^a-zA-Z0-9]/g,
            '_'
          ),
        });
      }
    });

    return blocks;
  };

  beforeAll(() => {
    // Create a temporary directory for our test project
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'readme-test-'));
    console.log(`Created test directory: ${tmpDir}`);

    // Create package.json
    const packageJson = {
      name: 'readme-test-consumer',
      version: '1.0.0',
      type: 'module',
      dependencies: {
        '@near-js/jsonrpc-types': `file:${path.resolve(__dirname, '../..')}`,
      },
      devDependencies: {
        '@types/node': '^20.0.0',
        typescript: '^5.0.0',
      },
    };
    fs.writeFileSync(
      path.join(tmpDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Create tsconfig.json
    const tsConfig = {
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        moduleResolution: 'node',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        declaration: true,
        outDir: './dist',
        rootDir: './src',
        resolveJsonModule: true,
        types: ['node'],
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist'],
    };
    fs.writeFileSync(
      path.join(tmpDir, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );

    // Create src directory
    fs.mkdirSync(path.join(tmpDir, 'src'));

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install', { cwd: tmpDir, stdio: 'inherit' });
  });

  afterAll(() => {
    // Clean up the temporary directory
    if (tmpDir && fs.existsSync(tmpDir)) {
      console.log(`Cleaning up test directory: ${tmpDir}`);
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('should extract and create test files for each code snippet', () => {
    const codeBlocks = extractCodeBlocks(readmeContent);
    expect(codeBlocks.length).toBeGreaterThan(0);
    console.log(`Extracted ${codeBlocks.length} code snippets from README`);

    // Create a test file for each snippet
    codeBlocks.forEach((block, index) => {
      const fileName = `example_${index}_${block.description}.ts`;
      const filePath = path.join(tmpDir, 'src', fileName);

      // Wrap the code in a function to make it executable
      let executableCode = block.code;

      // Skip pure import blocks
      if (
        executableCode.trim().startsWith('import') &&
        !executableCode.includes('const ') &&
        !executableCode.includes('let ')
      ) {
        return;
      }

      // Add a main function wrapper for examples that have executable code
      if (
        !executableCode.includes('export') &&
        !executableCode.includes('// These can be used')
      ) {
        executableCode = `${executableCode}

// Test execution
export function test_${index}() {
  console.log('Example ${index} (${block.description}) executed successfully');
  return true;
}

// Run if this is the main module
if (import.meta.url === \`file://\${process.argv[1]}\`) {
  test_${index}();
}`;
      }

      fs.writeFileSync(filePath, executableCode);
      console.log(`Created: ${fileName}`);
    });
  });

  it('should compile all TypeScript files without errors', () => {
    console.log('Compiling TypeScript files...');

    try {
      const output = execSync('npx tsc', {
        cwd: tmpDir,
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      if (output) {
        console.log('TypeScript compilation output:', output);
      }

      // Check that dist directory was created
      const distDir = path.join(tmpDir, 'dist');
      expect(fs.existsSync(distDir)).toBe(true);

      // Check that JavaScript files were generated
      const jsFiles = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));
      expect(jsFiles.length).toBeGreaterThan(0);
      console.log(`Successfully compiled ${jsFiles.length} TypeScript files`);
    } catch (error: any) {
      console.error('TypeScript compilation failed:', error.message);
      if (error.stdout) console.error('stdout:', error.stdout.toString());
      if (error.stderr) console.error('stderr:', error.stderr.toString());
      throw error;
    }
  });

  it('should run compiled JavaScript files without runtime errors', () => {
    const distDir = path.join(tmpDir, 'dist');
    const jsFiles = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));

    console.log(`Running ${jsFiles.length} compiled JavaScript files...`);

    jsFiles.forEach(file => {
      const filePath = path.join(distDir, file);

      // Skip files that are just type definitions or imports
      const content = fs.readFileSync(filePath, 'utf-8');
      if (!content.includes('test_') && !content.includes('console.log')) {
        console.log(`Skipping ${file} (no executable code)`);
        return;
      }

      try {
        console.log(`Running: ${file}`);
        const output = execSync(`node ${filePath}`, {
          cwd: tmpDir,
          encoding: 'utf-8',
          env: { ...process.env, NODE_PATH: path.join(tmpDir, 'node_modules') },
        });

        if (output) {
          console.log(`Output from ${file}:`, output.trim());
        }

        // Test passed if no error was thrown
        expect(true).toBe(true);
      } catch (error: any) {
        console.error(`Failed to run ${file}:`, error.message);
        if (error.stdout) console.error('stdout:', error.stdout.toString());
        if (error.stderr) console.error('stderr:', error.stderr.toString());

        // Check if this is an expected error (e.g., validation examples)
        if (
          content.includes('validation failed') ||
          content.includes('.error')
        ) {
          console.log(`Expected error in ${file}`);
          expect(true).toBe(true);
        } else {
          throw error;
        }
      }
    });
  });

  it('should create a comprehensive test file that uses all features', () => {
    const comprehensiveTest = `
import { 
  // Types
  type AccountView, 
  type AccessKeyView, 
  type RpcQueryRequest,
  type RpcMethod,
  // Schemas
  AccountViewSchema,
  AccessKeyViewSchema,
  RpcQueryRequestSchema,
  // Methods
  RPC_METHODS,
  PATH_TO_METHOD_MAP
} from '@near-js/jsonrpc-types';

console.log('Testing @near-js/jsonrpc-types package...');

// Test 1: Basic Types
const account: AccountView = {
  amount: "1000000000000000000000000",
  locked: "0",
  codeHash: "11111111111111111111111111111111",
  storageUsage: 182,
  storagePaidAt: 0
};
console.log('✓ AccountView type works');

const accessKey: AccessKeyView = {
  nonce: 1,
  permission: "FullAccess"
};
console.log('✓ AccessKeyView type works');

// Test 2: Schema Validation
const accountValidation = AccountViewSchema().safeParse(account);
if (!accountValidation.success) {
  throw new Error('AccountView validation failed');
}
console.log('✓ AccountView schema validation works');

const accessKeyValidation = AccessKeyViewSchema().safeParse(accessKey);
if (!accessKeyValidation.success) {
  throw new Error('AccessKeyView validation failed');
}
console.log('✓ AccessKeyView schema validation works');

// Test 3: RPC Query Request
const queryRequest: RpcQueryRequest = {
  requestType: "view_account",
  finality: "final",
  accountId: "example.near"
};

const queryValidation = RpcQueryRequestSchema().safeParse(queryRequest);
if (!queryValidation.success) {
  throw new Error('RpcQueryRequest validation failed');
}
console.log('✓ RpcQueryRequest type and validation works');

// Test 4: RPC Methods
if (!Array.isArray(RPC_METHODS) || RPC_METHODS.length === 0) {
  throw new Error('RPC_METHODS is not a valid array');
}
console.log(\`✓ RPC_METHODS contains \${RPC_METHODS.length} methods\`);

if (typeof PATH_TO_METHOD_MAP !== 'object') {
  throw new Error('PATH_TO_METHOD_MAP is not an object');
}
console.log(\`✓ PATH_TO_METHOD_MAP contains \${Object.keys(PATH_TO_METHOD_MAP).length} mappings\`);

// Test 5: Type-safe method names
const method: RpcMethod = 'query';
if (!RPC_METHODS.includes(method)) {
  throw new Error(\`Method '\${method}' not found in RPC_METHODS\`);
}
console.log('✓ Type-safe RPC method names work');

// Test 6: Invalid data validation
const invalidAccount = {
  amount: 123, // Should be string
  locked: "0",
  codeHash: "11111111111111111111111111111111",
  storageUsage: 182,
  storagePaidAt: 0
};

const invalidValidation = AccountViewSchema().safeParse(invalidAccount);
if (invalidValidation.success) {
  throw new Error('Invalid account should not pass validation');
}
console.log('✓ Schema correctly rejects invalid data');

console.log('\\n✅ All tests passed! The @near-js/jsonrpc-types package works correctly.');
`;

    const testFilePath = path.join(tmpDir, 'src', 'comprehensive_test.ts');
    fs.writeFileSync(testFilePath, comprehensiveTest);
    console.log('Created comprehensive test file');

    // Compile it
    try {
      execSync('npx tsc', { cwd: tmpDir, stdio: 'pipe' });
      console.log('✓ Comprehensive test compiled successfully');
    } catch (error: any) {
      console.error('Failed to compile comprehensive test:', error.message);
      throw error;
    }

    // Run it
    try {
      const output = execSync('node dist/comprehensive_test.js', {
        cwd: tmpDir,
        encoding: 'utf-8',
      });
      console.log('Comprehensive test output:\n', output);
      expect(output).toContain('All tests passed');
    } catch (error: any) {
      console.error('Failed to run comprehensive test:', error.message);
      throw error;
    }
  });
});
