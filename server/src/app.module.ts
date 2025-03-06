import { Module } from '@nestjs/common';
import { CompanyController } from './infrastructure/http/controllers/company.controller';
import { UserController } from './infrastructure/http/controllers/user.controller';
import { PrismaService } from './infrastructure/database/prisma.service';
import { CompanyRepository } from './infrastructure/database/repositories/company.repository';
import { UserRepository } from './infrastructure/database/repositories/user.repository';
import { CreateCompanyUseCase } from './core/use-cases/company/create-company.use-case';
import { DeleteCompanyUseCase } from './core/use-cases/company/delete-company.use-case';
import { CreateUserUseCase } from './core/use-cases/user/create-user.use-case';
import { DeleteUserUseCase } from './core/use-cases/user/delete-user.use-case';
import { COMPANY_REPOSITORY } from './core/interfaces/tokens';
import { USER_REPOSITORY } from './core/interfaces/tokens';

@Module({
  imports: [],
  controllers: [CompanyController, UserController],
  providers: [
    PrismaService,
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    CreateCompanyUseCase,
    DeleteCompanyUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class AppModule {}
