import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EpisodeTimeTrackerDocument = EpisodeTimeTrackerModel & Document;
export const EPISODE_TIME_TRACKER_NAME = 'episodeTimeTracker';

@Schema()
export class EpisodeTimeTrackerModel {
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
  userUuid: string;

  @Prop({
    type: Number,
    required: true,
  })
  time: number;
}

export const MongoEpisodeTimeTrackerSchema = SchemaFactory.createForClass(
  EpisodeTimeTrackerModel,
);
