import fs from 'node:fs/promises';
import path from 'node:path';

export async function readFileAsync(location, fileName, encoding = 'utf8') {
  const filePath = path.resolve(process.cwd(), location, fileName);
  return await fs.readFile(filePath, encoding);
}
