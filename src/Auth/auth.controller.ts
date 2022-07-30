import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

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
import { LoginResponseSwaggerModel } from './infrastructure/SwaggerDoc/LoginResponseSwaggerModel';
import { PasswordChangeBodySwagger } from './infrastructure/SwaggerDoc/PasswordChangeBodySwagger';
import { PasswordRecoverBodySwagger } from './infrastructure/SwaggerDoc/PasswordRecoverBodySwagger';
import { SignupBodySwagger } from './infrastructure/SwaggerDoc/SignupBodySwagger';
import { UserWithoutPasswordSwaggerModel } from '../User/infrastructure/UserWithoutPasswordSwaggerModel';
import { LoginBodySwagger } from './infrastructure/SwaggerDoc/LoginBodySwagger';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('Auth')
export class AuthController {
  constructor(
    private userLogin: LoginUser,
    private signupper: SignupUser,
    private passwordRecover: PasswordRecover,
    private passwordChanger: PasswordChanger,
    private userValidator: UserValidator,
  ) {}

  @Post('login/token')
  @ApiResponse({ status: 200, type: UserWithoutPasswordSwaggerModel })
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
  @ApiBody({ type: LoginBodySwagger })
  @ApiResponse({ status: 200, type: LoginResponseSwaggerModel })
  public async login(
    @Body() body: { email: string; password: string },
  ): Promise<LoginReponse> {
    const { email, password } = body;

    return await this.userLogin.login(email, password);
  }

  @Put('password')
  @ApiBody({ type: PasswordChangeBodySwagger })
  @ApiResponse({ status: 201 })
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
  @ApiBody({ type: PasswordRecoverBodySwagger })
  @ApiResponse({ status: 201 })
  public async recoveryPassword(
    @Body() body: PasswordRecoverParams,
  ): Promise<void> {
    await this.passwordRecover.recovery(body);
  }

  @Put('validate')
  @ApiResponse({ status: 201 })
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
  @ApiBody({ type: SignupBodySwagger })
  @ApiResponse({ status: 201 })
  public async signup(@Body() body: SingupRequest): Promise<void> {
    await this.signupper.signup(body);
  }
}
