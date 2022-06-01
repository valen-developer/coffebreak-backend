import { ICrypt } from "../../Shared/domain/interfaces/Crypt.interface";
import { JWT } from "../../Shared/domain/interfaces/JWT.interface";
import { User, UserDto } from "../domain/User.mode";
import { UserFinder } from "./UserFinder";

export class LoginUser {
  constructor(
    private userFinder: UserFinder,
    private crypt: ICrypt,
    private jwt: JWT
  ) {}

  public async login(email: string, password: string): Promise<LoginReponse> {
    const user = await this.userFinder.findByEmail(email);

    this.validatePassword(password, user.password.value);
    const jwt = this.generateJWT(user);

    return {
      user: user.toDtoWidthoutPassword(),
      token: jwt,
    };
  }

  private validatePassword(value: string, hash: string): void {}

  private generateJWT(user: User): string {
    return this.jwt.sign(
      {
        uuid: user.uuid.value,
      },
      "secret"
    );
  }
}

export interface LoginReponse {
  user: Omit<UserDto, "password">;
  token: string;
}
