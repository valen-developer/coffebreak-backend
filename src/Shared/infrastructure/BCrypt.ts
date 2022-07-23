import bcrypt from "bcrypt";

import { ICrypt } from "../domain/interfaces/Crypt.interface";

export class BCrypt implements ICrypt {
  hash(value: string, salt: number): string {
    return bcrypt.hashSync(value, salt);
  }
  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash);
  }
}
