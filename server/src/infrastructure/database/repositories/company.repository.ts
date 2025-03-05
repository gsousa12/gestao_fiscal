import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ICompanyRepository } from 'src/core/interfaces/company-repository.interface';
import { Company } from 'src/core/entities/company.entity';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(company: Company): Promise<Company> {
    return this.prisma.company.create({ data: company });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.company.delete({ where: { id } });
  }
}
