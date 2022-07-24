import { Body, Controller, Post } from '@nestjs/common';
import { LoginReponse, LoginUser } from './application/LoginUser';

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
}
