const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const reportsDir = path.join(__dirname, '..', 'cypress', 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const outputPath = path.join(reportsDir, 'output.json');
try {
  const mergedJson = execSync('npx mochawesome-merge cypress/results/*.json', {
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024
  });
  fs.writeFileSync(outputPath, mergedJson, 'utf-8');
  console.log(`Merged report saved to ${outputPath}`);
} catch (error) {
  console.error('Failed to merge mochawesome reports:', error.message);
  process.exit(1);
}
