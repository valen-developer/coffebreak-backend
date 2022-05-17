import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";

export class InvalidImageExtension extends InvalidException implements Error {
  public readonly name: string;
  public readonly message: string;
  stack?: string | undefined;

  constructor(ext: string) {
    super();
    this.name = "InvalidImageExtension";
    this.message = `Invalid image extension: ${ext}`;
  }
}
