import { Injectable, Inject } from '@nestjs/common';
import { ICompanyRepository } from '../interfaces/company-repository.interface';
import { Company } from '../entities/company.entity';
import { COMPANY_REPOSITORY } from '../interfaces/tokens';

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
