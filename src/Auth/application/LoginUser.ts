import { Injectable } from '@nestjs/common';
import { UserFinder } from 'src/User/application/UserFinder';
import { InvalidPasswordException } from 'src/User/domain/exceptions/InvalidPassword.exception';
import { NotActiveUserException } from 'src/User/domain/exceptions/NotActiveUser.exception';
import { NotFoundUserException } from 'src/User/domain/exceptions/NotUserFound.exception';
import { User, UserDto } from 'src/User/domain/User.mode';

import { ICrypt } from '../../Shared/domain/interfaces/Crypt.interface';
import { JWT, JWT_CONFIG } from '../../Shared/domain/interfaces/JWT.interface';

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
