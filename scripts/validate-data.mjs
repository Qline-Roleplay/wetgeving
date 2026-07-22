// Validates every file in /data against its paired JSON Schema in /schema.
// Run via `npm run validate:data`; also gated in CI on any PR touching
// data/** or schema/** (see .github/workflows/validate-data.yml).
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const PAIRS = [
  { schema: 'boetetabel.schema.json', data: 'boetetabel.json' },
  { schema: 'wetboek.schema.json', data: 'wetboek.json' },
  { schema: 'kosten.schema.json', data: 'kosten.json' },
];

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

let hadError = false;

for (const pair of PAIRS) {
  const schemaPath = path.join(rootDir, 'schema', pair.schema);
  const dataPath = path.join(rootDir, 'data', pair.data);

  const schema = readJson(schemaPath);
  const data = readJson(dataPath);

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (valid) {
    console.log(`OK   data/${pair.data} (${data.length} entries) matches schema/${pair.schema}`);
    continue;
  }

  hadError = true;
  console.error(`FAIL data/${pair.data} does not match schema/${pair.schema}:`);
  for (const err of validate.errors ?? []) {
    console.error(`  ${err.instancePath || '(root)'} ${err.message} ${JSON.stringify(err.params)}`);
  }
}

// Duplicate-id check: schemas validate shape per-entry, not uniqueness
// across the array, so that's enforced here instead.
for (const pair of PAIRS) {
  const dataPath = path.join(rootDir, 'data', pair.data);
  const data = readJson(dataPath);
  const seen = new Set();
  for (const entry of data) {
    if (seen.has(entry.id)) {
      hadError = true;
      console.error(`FAIL data/${pair.data} has a duplicate id: "${entry.id}"`);
    }
    seen.add(entry.id);
  }
}

if (hadError) {
  console.error('\nvalidate:data failed.');
  process.exit(1);
}

console.log('\nvalidate:data passed.');
