import { Injectable, Inject } from '@nestjs/common';
import { ICompanyRepository } from '../interfaces/company-repository.interface';
import { Company } from '../entities/company.entity';
import { COMPANY_REPOSITORY } from '../interfaces/tokens'; // Importe o token

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) // Use o token
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(company: Company): Promise<Company> {
    return this.companyRepository.create(company);
  }
}
