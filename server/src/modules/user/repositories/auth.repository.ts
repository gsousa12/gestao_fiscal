import { Injectable } from '@nestjs/common';
import { AuthRepositoryInterface } from '../../../core/interfaces/auth-repository.interface';
import { User } from '../../../core/entities/user.entity';
import { PrismaService } from 'src/modules/shared/services/prisma.service';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
