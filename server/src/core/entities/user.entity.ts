import { UserRole } from 'src/shared/utils/enum';

export class User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
