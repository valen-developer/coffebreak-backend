import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { User, UserDto } from '../User/domain/User.mode';
import { LoginReponse, LoginUser } from './application/LoginUser';
import { PasswordChanger } from './application/PasswordChanger';
import { JWTGuard } from './infrastructure/JWT.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userLogin: LoginUser,
    private passwordChanger: PasswordChanger,
  ) {}

  @Post('login/token')
  @UseGuards(JWTGuard)
  public async loginWithToken(
    @Req() req: Request,
  ): Promise<Omit<UserDto, 'password'>> {
    const user = req.body.session?.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    return user.toDtoWidthoutPassword();
  }

  @Post('login')
  public async login(
    @Body() body: { email: string; password: string },
  ): Promise<LoginReponse> {
    const { email, password } = body;

    return await this.userLogin.login(email, password);
  }

  @Put('password')
  @UseGuards(JWTGuard)
  public async changePassword(
    @Body()
    body: {
      password: string;
      passwordConfirmation: string;
      session: { user: User };
    },
  ): Promise<void> {
    const {
      password,
      passwordConfirmation,
      session: { user },
    } = body;

    await this.passwordChanger.changePassword({
      password,
      passwordConfirmation,
      userUuid: user.uuid.value,
    });
  }
}
