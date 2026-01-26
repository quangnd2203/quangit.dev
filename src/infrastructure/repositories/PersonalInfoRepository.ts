import { IPersonalInfoRepository } from '@/core/interfaces/IPersonalInfoRepository';
import { PersonalInfo } from '@/core/entities/PersonalInfo';
import { mockPersonalInfo } from '@/shared/data/personalInfo';

export class PersonalInfoRepository implements IPersonalInfoRepository {
  async get(): Promise<PersonalInfo | null> {
    // Return mock data
    return Promise.resolve(mockPersonalInfo);
  }
}
