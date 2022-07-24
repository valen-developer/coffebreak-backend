import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ICrypt } from '../domain/interfaces/Crypt.interface';

@Injectable()
export class BCrypt implements ICrypt {
  hash(value: string, salt: number): string {
    return bcrypt.hashSync(value, salt);
  }
  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash);
  }
}
