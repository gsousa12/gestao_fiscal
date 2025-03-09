import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepositoryInterface } from '../../../core/interfaces/auth-repository.interface';
import { User } from '../../../core/entities/user.entity';
import { PrismaService } from 'src/modules/shared/services/prisma.service';
import { MainException } from 'src/core/exceptions/main.exception';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const existRegisteredEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existRegisteredEmail) {
      throw new MainException(
        'Não existe usuário com esse email cadastrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.user.findUnique({ where: { email } });
  }
}
