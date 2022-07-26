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
import { UserValidator } from 'src/User/application/UserValidator';
import { User, UserDto } from '../User/domain/User.mode';
import { LoginReponse, LoginUser } from './application/LoginUser';
import { PasswordChanger } from './application/PasswordChanger';
import {
  PasswordRecover,
  PasswordRecoverParams,
} from './application/PasswordRecover';
import { SignupUser, SingupRequest } from './application/SingupUser';
import { JWTGuard } from './infrastructure/JWT.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userLogin: LoginUser,
    private signupper: SignupUser,
    private passwordRecover: PasswordRecover,
    private passwordChanger: PasswordChanger,
    private userValidator: UserValidator,
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

  @Put('recovery')
  public async recoveryPassword(
    @Body() body: PasswordRecoverParams,
  ): Promise<void> {
    await this.passwordRecover.recovery(body);
  }

  @Put('validate')
  @UseGuards(JWTGuard)
  public async validate(
    @Body() body: { session: { user: User } },
  ): Promise<void> {
    const user = body.session?.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.userValidator.validateUser(user);
  }

  @Post('signup')
  public async signup(@Body() body: SingupRequest): Promise<void> {
    await this.signupper.signup(body);
  }
}
