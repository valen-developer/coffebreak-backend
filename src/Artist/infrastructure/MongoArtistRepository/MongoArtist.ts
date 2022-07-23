import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MongoArtistDocument = MongoArtistModel & Document;

export const ARTIST_NAME = 'artist';

@Schema({})
export class MongoArtistModel {
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
  name: string;

  @Prop({
    type: [Number],
    default: [],
  })
  episodes: [number];
}

export const MongoArtistSchema = SchemaFactory.createForClass(MongoArtistModel);
