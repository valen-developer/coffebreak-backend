import { ICrypt } from "../../Shared/domain/interfaces/Crypt.interface";
import { User, UserDto } from "../domain/User.mode";
import { UserCreator } from "./UserCreator";

export class SignupUser {
  constructor(private userCreator: UserCreator, private crypt: ICrypt) {}

  public async signup(userdto: UserDto): Promise<User> {
    const user = new User({
      ...userdto,
      password: this.crypt.hash(userdto.password, 10),
    });

    return this.userCreator.create(user.toDto());
  }
}
