import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../../core/interfaces/user-repository.interface';
import { USER_REPOSITORY } from '../../../core/interfaces/tokens';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
