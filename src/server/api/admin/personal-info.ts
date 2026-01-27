import { PersonalInfo } from '@/core/entities/PersonalInfo';
import { readJsonFile, writeJsonFile } from '@/server/data/jsonStorage';

const PERSONAL_INFO_FILE = 'personal-info.json';

/**
 * Get personal information
 */
export const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
  try {
    const data = await readJsonFile<PersonalInfo>(PERSONAL_INFO_FILE);
    return data;
  } catch (error) {
    console.error('Error getting personal info:', error);
    throw new Error('Failed to get personal information');
  }
};

/**
 * Update personal information
 */
export const updatePersonalInfo = async (data: PersonalInfo): Promise<PersonalInfo> => {
  try {
    // Validate required fields
    if (!data.name || !data.title || !data.description) {
      throw new Error('Name, title, and description are required');
    }

    if (!data.contact?.email || !data.contact?.phone) {
      throw new Error('Email and phone are required');
    }

    // Write to JSON file
    await writeJsonFile(PERSONAL_INFO_FILE, data);

    return data;
  } catch (error) {
    console.error('Error updating personal info:', error);
    throw error instanceof Error ? error : new Error('Failed to update personal information');
  }
};
