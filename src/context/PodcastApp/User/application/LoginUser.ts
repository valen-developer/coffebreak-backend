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
    try {
      const user = await this.userFinder.findByEmail(email);

      this.validatePassword(password, user.password.value);
      const jwt = this.generateJWT(user);

      return {
        user: user.toDtoWidthoutPassword(),
        token: jwt,
      };
    } catch (error) {
      // TODO: make custom error
      throw error;
    }
  }

  private validatePassword(value: string, hash: string): void {
    const isValid = this.crypt.compare(value, hash);

    if (isValid) return;

    // TODO: make custom error
    throw new Error("Password is not valid");
  }

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
