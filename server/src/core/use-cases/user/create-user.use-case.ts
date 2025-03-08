import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { User } from '../../entities/user.entity';
import { USER_REPOSITORY } from '../../interfaces/tokens';
import { PasswordUtils } from '../../../shared/utils/password.utils';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: User): Promise<User> {
    user.password = await PasswordUtils.hashPassword(user.password);
    return this.userRepository.create(user);
  }
}
