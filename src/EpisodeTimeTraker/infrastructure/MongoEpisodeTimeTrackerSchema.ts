import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { EpisodeTimeTrackerDTO } from '../domain/EpisodeTimeTracker.model';

export type EpisodeTimeTrackerDocument = EpisodeTimeTrackerModel & Document;
export const EPISODE_TIME_TRACKER_NAME = 'episodeTimeTracker';

@Schema()
export class EpisodeTimeTrackerModel implements EpisodeTimeTrackerDTO {
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

  @Prop({
    type: Number,
    required: true,
  })
  episodeDuration: number;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  updatedAt: Date;
}

export const MongoEpisodeTimeTrackerSchema = SchemaFactory.createForClass(
  EpisodeTimeTrackerModel,
);
