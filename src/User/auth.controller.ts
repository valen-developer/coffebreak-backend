import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { LoginReponse, LoginUser } from './application/LoginUser';
import { UserDto } from './domain/User.mode';

@Controller('auth')
export class AuthController {
  constructor(private userLogin: LoginUser) {}

  @Post('login')
  public async login(
    @Body() body: { email: string; password: string },
  ): Promise<LoginReponse> {
    const { email, password } = body;

    return await this.userLogin.login(email, password);
  }

  @Post('login/token')
  public async loginWithToken(
    @Req() req: Request,
  ): Promise<Omit<UserDto, 'password'>> {
    const user = req.body.session?.user;
    if (!user) {
      throw new Error('Not logged user');
    }

    return user.toDtoWidthoutPassword();
  }
}
