import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/application/dto/request/create-user-request.dto';
import { UserMapper } from 'src/application/mappers/user.mapper';
import { Roles } from 'src/modules/shared/decorators/role-decorator';
import { RolesGuard } from 'src/modules/shared/guards/roles-guard';
import { CreateUserUseCase } from 'src/modules/user/use-cases/create-user.use-case';
import { DeleteUserUseCase } from 'src/modules/user/use-cases/delete-user.use-case';

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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(0, 2)
  async delete(@Param('id') id: number) {
    await this.deleteUserUseCase.execute(+id);
    return { message: 'Usuário deletado com sucesso!' };
  }
}
