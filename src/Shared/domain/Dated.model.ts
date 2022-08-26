import { DateValueObject } from './valueObjects/Date.valueObject';

export class Dated {
  createdAt: DateValueObject;
  updatedAt: DateValueObject;

  constructor(params: DatedDTO) {
    this.createdAt = new DateValueObject(
      params.createdAt ?? new Date(),
      'createdAt',
    );
    this.updatedAt = new DateValueObject(
      params.updatedAt ?? new Date(),
      'updatedAt',
    );
  }
}

export interface DatedDTO {
  createdAt?: Date;
  updatedAt?: Date;
}
