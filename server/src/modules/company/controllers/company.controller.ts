import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateCompanyDto } from 'src/application/dto/request/create-company.dto';
import { CompanyMapper } from 'src/application/mappers/company.mapper';
import { CreateCompanyUseCase } from 'src/modules/company/use-cases/create-company.use-case';
import { DeleteCompanyUseCase } from 'src/modules/company/use-cases/delete-company.use-case';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
  ) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const company = CompanyMapper.toDomain(createCompanyDto);
    return this.createCompanyUseCase.execute(company);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.deleteCompanyUseCase.execute(+id);
  }
}
