import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { UUIDGenerator } from '../domain/interfaces/UuidGenerator';

@Injectable()
export class NanoUuidGenerator implements UUIDGenerator {
  public generate(): string {
    return nanoid();
  }
}
