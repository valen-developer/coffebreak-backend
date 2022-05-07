import { nanoid } from "nanoid";

import { UUIDGenerator } from "../domain/interfaces/UuidGenerator";

export class NanoUuidGenerator implements UUIDGenerator {
  public generate(): string {
    return nanoid();
  }
}
