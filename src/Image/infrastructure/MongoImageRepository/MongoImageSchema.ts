import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type MongoImageDocument = Document;
export const IMAGE_NAME = 'image';

@Schema()
export class MongoImageModel {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  uuid: string;

  @Prop({
    type: String,
    required: true,
  })
  entityUuid: string;

  @Prop({
    type: String,
    required: true,
  })
  path: string;
}

export const MongoImageSchema = SchemaFactory.createForClass(MongoImageModel);
