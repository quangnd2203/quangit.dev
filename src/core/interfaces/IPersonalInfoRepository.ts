import { PersonalInfo } from '../entities/PersonalInfo';

export interface IPersonalInfoRepository {
  get(): Promise<PersonalInfo | null>;
}
