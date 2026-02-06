import { IPersonalInfoRepository } from '../interfaces/IPersonalInfoRepository';
import { PersonalInfo } from '../entities/PersonalInfo';

export class GetPersonalInfo {
    constructor(private personalInfoRepository: IPersonalInfoRepository) {}

    async execute(): Promise<PersonalInfo | null> {
        return await this.personalInfoRepository.get();
    }
}
