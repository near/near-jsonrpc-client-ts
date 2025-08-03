#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Read coverage summary from the coverage output
const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');

if (!fs.existsSync(coveragePath)) {
  console.error('Coverage summary not found. Run tests with coverage first.');
  process.exit(1);
}

const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
const coverage = {
  statements: coverageData.total.statements.pct,
  branches: coverageData.total.branches.pct,
  functions: coverageData.total.functions.pct,
  lines: coverageData.total.lines.pct,
};

const thresholds = {
  branches: 85,
  functions: 80,
  lines: 80,
  statements: 80,
};

let failed = false;
const results = [];

for (const [metric, threshold] of Object.entries(thresholds)) {
  const actual = coverage[metric];
  const passed = actual >= threshold;
  
  if (!passed) {
    failed = true;
  }
  
  results.push({
    metric,
    threshold,
    actual: actual.toFixed(2),
    passed,
  });
}

console.log('\nCoverage threshold check:');
console.log('-------------------------');
results.forEach(({ metric, threshold, actual, passed }) => {
  const symbol = passed ? '✅' : '❌';
  console.log(`${symbol} ${metric}: ${actual}% (threshold: ${threshold}%)`);
});

if (failed) {
  console.error('\n❌ Coverage thresholds not met!');
  process.exit(1);
} else {
  console.log('\n✅ All coverage thresholds met!');
  process.exit(0);
}