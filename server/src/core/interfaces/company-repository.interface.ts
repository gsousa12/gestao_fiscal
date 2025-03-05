import { Company } from '../entities/company.entity';

export interface ICompanyRepository {
  create(company: Company): Promise<Company>;
  delete(id: number): Promise<void>;
}
