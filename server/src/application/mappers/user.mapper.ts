import { User } from 'src/core/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserMapper {
  static toDomain(createUserDto: CreateUserDto): User {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    return user;
  }
}
