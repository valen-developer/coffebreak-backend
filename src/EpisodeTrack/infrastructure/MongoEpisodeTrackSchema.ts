import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EpisodeTrackDocument = EpisodeTrackModel & Document;
export const EPISODE_TRACK_NAME = 'episodetrack';

@Schema()
export class EpisodeTrackModel {
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
  episodeUuid: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  time: string;
}

export const MongoEpisodeTrackSchema =
  SchemaFactory.createForClass(EpisodeTrackModel);
