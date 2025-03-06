import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dto/create-user.dto';
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
    const user = UserMapper.toDomain(createUserDto);
    return this.createUserUseCase.execute(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.deleteUserUseCase.execute(+id);
  }
}
