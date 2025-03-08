import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dto/request/create-user-request.dto';
import { UserMapper } from 'src/application/mappers/user.mapper';
import { CreateUserUseCase } from 'src/core/use-cases/user/create-user.use-case';
import { DeleteUserUseCase } from 'src/core/use-cases/user/delete-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await UserMapper.toDomain(createUserDto);
    const createdUser = await this.createUserUseCase.execute(user);
    const userResponse = UserMapper.toResponse(createdUser);

    return userResponse;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.deleteUserUseCase.execute(+id);
    return { message: 'Usuário deletado com sucesso!' };
  }
}
