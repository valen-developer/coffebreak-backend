import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";

export class InvalidEmail extends InvalidException {
  constructor() {
    const message = "Invalid email";
    super(message);
  }
}
