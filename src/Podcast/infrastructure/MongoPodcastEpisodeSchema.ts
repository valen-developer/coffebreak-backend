import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MongoEpisodeDocument = MongoPodcastEpisodeModel & Document;
export const EPISODE_NAME = 'episode';

@Schema()
export class MongoPodcastEpisodeModel {
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
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: String,
  })
  imageUrl: string;

  @Prop({
    type: String,
    required: true,
  })
  audioUrl: string;

  @Prop({
    type: Date,
    required: true,
  })
  pubDate: Date;

  @Prop({
    type: Number,
    required: true,
  })
  duration: number;

  @Prop({
    type: Number,
  })
  episode: number;
}

export const MongoEpisodeSchema = SchemaFactory.createForClass(
  MongoPodcastEpisodeModel,
);
