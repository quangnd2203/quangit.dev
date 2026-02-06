import { IPersonalInfoRepository } from '@/core/interfaces/IPersonalInfoRepository';
import { PersonalInfo } from '@/core/entities/PersonalInfo';

export class PersonalInfoRepository implements IPersonalInfoRepository {
    async get(): Promise<PersonalInfo | null> {
        try {
            const response = await fetch('/api/admin/personal-info');

            if (!response.ok) {
                throw new Error('Failed to fetch personal info');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching personal info:', error);
            return null;
        }
    }
}
