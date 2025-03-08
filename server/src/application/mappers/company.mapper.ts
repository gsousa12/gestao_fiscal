import { Company } from 'src/core/entities/company.entity';
import { CreateCompanyDto } from '../dto/request/create-company.dto';

export class CompanyMapper {
  static toDomain(dto: CreateCompanyDto): Company {
    const company = new Company();
    company.name = dto.name;
    company.taxNumber = dto.taxNumber;
    return company;
  }
}
