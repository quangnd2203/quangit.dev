import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), '.data');

/**
 * Read JSON file from data directory
 */
export const readJsonFile = async <T>(filename: string): Promise<T | null> => {
  try {
    const filePath = join(DATA_DIR, filename);
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null; // File doesn't exist yet
    }
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
};

/**
 * Write JSON file to data directory
 */
export const writeJsonFile = async <T>(filename: string, data: T): Promise<void> => {
  try {
    const filePath = join(DATA_DIR, filename);
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
};
