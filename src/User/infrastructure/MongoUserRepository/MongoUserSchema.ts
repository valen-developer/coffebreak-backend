import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MongoUserDocument = MongoUserModel & Document;
export const USER_NAME = 'user';

@Schema()
export class MongoUserModel {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  uuid: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  role: string;

  @Prop({
    type: String,
    required: true,
  })
  status: string;
}

export const MongoUserSchema = SchemaFactory.createForClass(MongoUserModel);
