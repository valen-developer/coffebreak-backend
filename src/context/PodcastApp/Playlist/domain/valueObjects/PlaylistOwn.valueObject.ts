import { Nullable } from "../../../../../helpers/types/Nullable.type";
import { UUID } from "../../../Shared/domain/valueObjects/Uuid.valueObject";
import { ValueObject } from "../../../Shared/domain/valueObjects/ValueObject.interface";

export class PlaylistOwn implements ValueObject {
  public readonly value: Nullable<string>;

  constructor(value: Nullable<string>) {
    this.value = value;
  }
}
