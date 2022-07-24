import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MongoPlaylistDocument = MongoPlaylistModel & Document;
export const PLAYLIST_NAME = 'playlist';

@Schema()
export class MongoPlaylistModel {
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
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: String,
  })
  own: string;

  @Prop({
    type: [String],
  })
  episodes: string[];
}

export const MongoPlaylistSchema =
  SchemaFactory.createForClass(MongoPlaylistModel);
