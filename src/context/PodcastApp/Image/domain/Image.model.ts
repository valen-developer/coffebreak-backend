import { UUID } from "../../Shared/domain/valueObjects/Uuid.valueObject";
import { ImagePath } from "./valueObject.ts/ImagePath.valueObject";

export class Image {
  public readonly uuid: UUID;
  public readonly entityUuid: UUID;

  public readonly path: ImagePath;

  constructor(dto: ImageDTO) {
    this.uuid = new UUID(dto.uuid);
    this.entityUuid = new UUID(dto.entityUuid);
    this.path = new ImagePath(dto.path);
  }

  public toDTO(): ImageDTO {
    return {
      uuid: this.uuid.value,
      entityUuid: this.entityUuid.value,
      path: this.path.value,
    };
  }
}

export interface ImageDTO {
  uuid: string;
  entityUuid: string;
  path: string;
}
