import { Module } from '@nestjs/common';
import { CompanyController } from './infrastructure/http/controllers/company.controller';
import { PrismaService } from './infrastructure/database/prisma.service';
import { CompanyRepository } from './infrastructure/database/repositories/company.repository';
import { CreateCompanyUseCase } from './core/use-cases/create-company.use-case';
import { DeleteCompanyUseCase } from './core/use-cases/delete-company.use-case';
import { COMPANY_REPOSITORY } from './core/interfaces/tokens';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [
    PrismaService,
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyRepository,
    },
    CreateCompanyUseCase,
    DeleteCompanyUseCase,
  ],
})
export class AppModule {}
