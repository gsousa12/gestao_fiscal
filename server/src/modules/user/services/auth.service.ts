import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepositoryInterface } from '../../../core/interfaces/auth-repository.interface';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from '../../../application/dto/request/login-request.dto';
import { LoginResponseDto } from '../../../application/dto/response/login-response.dto';
import { AUTH_REPOSITORY } from '../../../core/interfaces/tokens';
import { MainException } from 'src/core/exceptions/main.exception';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new MainException(
        'Email ou senha inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
