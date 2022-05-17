import { NullException } from "../exceptions/Null.exception";
import { ValueObject } from "./ValueObject.interface";

export class NotNullValueObject<T> implements ValueObject {
  public readonly value: T;

  constructor(value: T, name: string) {
    this.value = value;
    this.checkValue(value, name);
  }

  private checkValue(value: T, name: string): void {
    if (value === null || value === undefined)
      throw new NullException(`${name}`);
  }
}
