import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IUserRepository } from '../../../core/interfaces/user-repository.interface';
import { User } from '../../../core/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async delete(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    await this.prisma.user.delete({ where: { id } });
  }
}
