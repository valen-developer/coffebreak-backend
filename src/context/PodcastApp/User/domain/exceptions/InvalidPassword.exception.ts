import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";

export class InvalidPasswordException extends InvalidException {
  public static readonly MAX_LENGTH = 20;
  public static readonly MIN_LENGTH = 8;

  public static readonly regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  constructor(password: string) {
    const message = InvalidPasswordException.buildMessage(password);
    super(message);
  }

  private static buildMessage(value: string): string {
    const isValidLong = InvalidPasswordException.isValidLong(value);
    const isValidComposed = InvalidPasswordException.isValidComposed(value);

    const initMessage = `User or password invalid.`;
    const invalidLongMessage = `Length must be between ${InvalidPasswordException.MIN_LENGTH} and ${InvalidPasswordException.MAX_LENGTH}`;
    const invalidComposedMessage = ` Password must contain at least: one lowercase, one upper, one number`;

    const message =
      `${initMessage} ` +
      (isValidLong ? "" : `${invalidLongMessage}. `) +
      (isValidComposed ? "" : `${invalidComposedMessage}.`);

    return message;
  }

  public static isValidLong(value: string): boolean {
    const MIN_LONG = InvalidPasswordException.MIN_LENGTH;
    const MAX_LONG = InvalidPasswordException.MAX_LENGTH;

    const isValid = value.length >= MIN_LONG && value.length <= MAX_LONG;

    return isValid;
  }

  public static isValidComposed(value: string): boolean {
    const regex = InvalidPasswordException.regEx;
    const isValid = regex.test(value);

    return isValid;
  }
}
