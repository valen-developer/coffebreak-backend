import { InvalidException } from "./Invalid.exception";

export class InvalidFormatException extends InvalidException implements Error {
  public readonly name: string;
  public readonly message: string;
  private correctFormat: string;

  stack?: string | undefined;

  constructor(correctFormat: string) {
    const message = `Invalid format. Correct format: ${correctFormat}`;
    super(message);
    this.correctFormat = correctFormat;

    this.name = "InvalidFormatException";
    this.message = `Invalid format. Correct format: ${this.correctFormat}`;
  }
}
