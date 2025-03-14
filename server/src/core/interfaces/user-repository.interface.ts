import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
