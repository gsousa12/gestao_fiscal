import { Injectable, Inject } from '@nestjs/common';
import { ICompanyRepository } from '../../../core/interfaces/company-repository.interface';
import { Company } from '../../../core/entities/company.entity';
import { COMPANY_REPOSITORY } from '../../../core/interfaces/tokens';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(company: Company): Promise<Company> {
    return this.companyRepository.create(company);
  }
}
