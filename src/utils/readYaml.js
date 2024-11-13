import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Define the GET function to handle the API request
export async function GET() {
  try {
    // Path to the data directory
    const dataDir = path.join(process.cwd(), 'src', 'data');

    // Get all YAML filenames in the data directory
    const filenames = fs.readdirSync(dataDir).filter((file) => file.endsWith('.yaml'));

    // Read each YAML file and parse the content
    const yamlData = filenames.map((filename) => {
      const filePath = path.join(dataDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const content = yaml.load(fileContent);
      return { filename, content };
    });

    // Return the YAML data as a JSON response
    return new Response(JSON.stringify(yamlData), { status: 200 });
  } catch (error) {
    console.error('Error reading YAML files:', error);
    return new Response('Error reading YAML files', { status: 500 });
  }
}
