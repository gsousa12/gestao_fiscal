import { User } from '../entities/user.entity';

export interface AuthRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
}
