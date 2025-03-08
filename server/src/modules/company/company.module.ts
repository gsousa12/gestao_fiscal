import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyRepository } from './repositories/company.repository';
import { CreateCompanyUseCase } from './use-cases/create-company.use-case';
import { DeleteCompanyUseCase } from './use-cases/delete-company.use-case';
import { COMPANY_REPOSITORY } from '../../core/interfaces/tokens';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [CompanyController],
  providers: [
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyRepository,
    },
    CreateCompanyUseCase,
    DeleteCompanyUseCase,
  ],
})
export class CompanyModule {}
