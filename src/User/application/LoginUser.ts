import { Injectable } from '@nestjs/common';

import { ICrypt } from '../../Shared/domain/interfaces/Crypt.interface';
import { JWT, JWT_CONFIG } from '../../Shared/domain/interfaces/JWT.interface';
import { InvalidPasswordException } from '../domain/exceptions/InvalidPassword.exception';
import { NotActiveUserException } from '../domain/exceptions/NotActiveUser.exception';
import { NotFoundUserException } from '../domain/exceptions/NotUserFound.exception';
import { User, UserDto } from '../domain/User.mode';
import { UserFinder } from './UserFinder';

@Injectable()
export class LoginUser {
  constructor(
    private userFinder: UserFinder,
    private crypt: ICrypt,
    private jwt: JWT,
  ) {}

  public async login(email: string, password: string): Promise<LoginReponse> {
    const user = await this.userFinder.findByEmail(email);

    this.validatePassword(password, user.password.value);
    this.validateUser(user);
    const jwt = this.generateJWT(user);

    return {
      user: user.toDtoWidthoutPassword(),
      token: jwt,
    };
  }

  private validateUser(user: User): void {
    if (!user) {
      throw new NotFoundUserException();
    }

    if (!user.status.isActive()) {
      throw new NotActiveUserException();
    }
  }

  private validatePassword(value: string, hash: string): void {
    const isValid = this.crypt.compare(value, hash);

    if (isValid) return;

    throw new InvalidPasswordException(value);
  }

  private generateJWT(user: User): string {
    // TODO: add env secret jwt
    return this.jwt.sign(
      {
        uuid: user.uuid.value,
      },
      JWT_CONFIG.secret,
    );
  }
}

export interface LoginReponse {
  user: Omit<UserDto, 'password'>;
  token: string;
}
