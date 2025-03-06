import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { User } from '../../entities/user.entity';
import { USER_REPOSITORY } from '../../interfaces/tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
