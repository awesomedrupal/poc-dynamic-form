import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Polyfill __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const formConfigPath = path.resolve(__dirname, '../src/config/formConfig.json');
const outputPath = path.resolve(__dirname, '../src/loadMarketConfigs.js');

// Read formConfig.json
const formConfig = JSON.parse(fs.readFileSync(formConfigPath, 'utf-8'));

let imports = '';
let journeyData = 'export const journeyData = {\n';
let formConfigs = 'export const formConfigs = {\n';

Object.keys(formConfig).forEach((market) => {
  const marketMapping = formConfig[market];

  // Journey import
  const journeyVarName = `${market.replace('-', '')}Journey`;
  imports += `import ${journeyVarName} from './${marketMapping.journey}';\n`;

  journeyData += `  '${market}': ${journeyVarName},\n`;

  formConfigs += `  '${market}': {\n`;
  
  // Forms import
  Object.keys(marketMapping).forEach((formKey) => {
    if (formKey === 'journey') return; // skip journey again
    const formVarName = `${market.replace('-', '')}${capitalizeFirstLetter(formKey)}`;
    imports += `import ${formVarName} from './${marketMapping[formKey]}';\n`;
    formConfigs += `    ${formKey}: ${formVarName},\n`;
  });

  formConfigs += `  },\n`;
});

journeyData += '};\n\n';
formConfigs += '};\n\n';

const fileContent = `// This file is auto-generated. Do not edit manually.

${imports}

${journeyData}
${formConfigs}
`;

// Write the output file
fs.writeFileSync(outputPath, fileContent);

console.log('✅ loadMarketConfigs.js generated successfully.');

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
