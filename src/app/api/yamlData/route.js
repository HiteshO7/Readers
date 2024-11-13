// src/app/api/yaml/route.js

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    const filenames = fs.readdirSync(dataDir).filter((file) => file.endsWith('.yaml'));

    const yamlData = filenames.map((filename) => {
      const filePath = path.join(dataDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const content = yaml.load(fileContent);
      return { filename, content };
    });

    // Log the data being sent to check for errors
    console.log('Sending YAML data:', JSON.stringify(yamlData, null, 2));

    return new Response(JSON.stringify(yamlData), { status: 200 });
  } catch (error) {
    console.error('Error reading YAML files:', error);
    return new Response('Error reading YAML files', { status: 500 });
  }
}
