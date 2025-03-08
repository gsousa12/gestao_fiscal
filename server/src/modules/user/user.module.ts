import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from './repositories/user.repository';
import { AuthRepository } from './repositories/auth.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { USER_REPOSITORY, AUTH_REPOSITORY } from '../../core/interfaces/tokens';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || 'fallback_secret_key',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    SharedModule,
  ],
  controllers: [UserController, AuthController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    CreateUserUseCase,
    DeleteUserUseCase,
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class UserModule {}
