export class InvalidException {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
