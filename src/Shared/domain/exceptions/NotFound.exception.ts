export class NotFoundException implements Error {
  public name: string;
  public message: string;

  stack?: string | undefined;

  constructor(message: string) {
    this.name = "NotFoundException";
    this.message = message;
  }
}
