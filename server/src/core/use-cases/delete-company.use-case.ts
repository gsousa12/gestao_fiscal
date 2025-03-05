import { Injectable, Inject } from '@nestjs/common';
import { ICompanyRepository } from '../interfaces/company-repository.interface';
import { COMPANY_REPOSITORY } from '../interfaces/tokens'; // Importe o token

@Injectable()
export class DeleteCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) // Use o token
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.companyRepository.delete(id);
  }
}
