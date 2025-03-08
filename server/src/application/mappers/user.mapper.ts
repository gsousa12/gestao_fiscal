import { CreateUserDto } from '../dto/request/create-user-request.dto';
import { User } from '../../core/entities/user.entity';
import { PasswordUtils } from '../../shared/utils/password.utils';
import { CreateUserResponseDto } from '../dto/response/create-user-response.dto';

export class UserMapper {
  static async toDomain(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await PasswordUtils.hashPassword(createUserDto.password);
    user.role = createUserDto.role;
    return user;
  }

  static toResponse(user: User): CreateUserResponseDto {
    const userResponse = new CreateUserResponseDto();
    userResponse.name = user.name;
    userResponse.email = user.email;
    userResponse.role = user.role;
    userResponse.createdAt = user.createdAt || new Date();
    return userResponse;
  }
}
