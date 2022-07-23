export class NullException extends Error {
  public name: string;
  public message: string;

  stack?: string | undefined;

  constructor(entity: string) {
    super();
    this.name = "NullException";
    this.message = `${entity} shuld not be null`;
  }
}
