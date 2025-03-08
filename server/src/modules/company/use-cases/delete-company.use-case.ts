import { Injectable, Inject } from '@nestjs/common';
import { ICompanyRepository } from '../../../core/interfaces/company-repository.interface';
import { COMPANY_REPOSITORY } from '../../../core/interfaces/tokens';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.companyRepository.delete(id);
  }
}
