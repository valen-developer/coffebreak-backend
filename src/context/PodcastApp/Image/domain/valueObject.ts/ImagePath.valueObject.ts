import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";

export class ImagePath extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "ImagePath");
  }
}
