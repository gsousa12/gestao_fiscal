import { UserRole } from 'src/shared/utils/enum';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: number;
}
