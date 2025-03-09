import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { IUserRepository } from '../../../core/interfaces/user-repository.interface';
import { User } from '../../../core/entities/user.entity';
import { MainException } from 'src/core/exceptions/main.exception';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const existRegisteredEmail = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existRegisteredEmail) {
      throw new MainException('Email já cadastrado', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.user.create({ data: user });
  }

  async delete(id: number): Promise<void> {
    const existeUserId = await this.prisma.user.findUnique({ where: { id } });

    if (!existeUserId) {
      throw new MainException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
