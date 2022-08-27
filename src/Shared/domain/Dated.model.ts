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

export interface DatedQuery {
  createdAt_equals?: Date;
  updatedAt_equals?: Date;
  createdAt_gte?: Date;
  createdAt_lte?: Date;
  updatedAt_gte?: Date;
  updatedAt_lte?: Date;
}
