import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

import { Nullable } from 'src/helpers/types/Nullable.type';
import { MongoEpisodeDocument } from 'src/Podcast/infrastructure/MongoPodcastEpisodeSchema';

import { EpisodeTrack, EpisodeTrackDto } from '../domain/EpisodeTrack.model';
import { EpisodeTrackRepository } from '../domain/interfaces/EpisodeTrackRepository.interface';
import { EPISODE_TRACK_NAME } from './MongoEpisodeTrackSchema';

@Injectable()
export class MongoEpisodeTrackRepository implements EpisodeTrackRepository {
  constructor(
    @InjectModel(EPISODE_TRACK_NAME)
    private mongoEpisodeTrackSchema: Model<MongoEpisodeDocument>,
  ) {}

  public async save(episodeTrack: EpisodeTrack): Promise<EpisodeTrack> {
    const mongoEpisodeTrack = new this.mongoEpisodeTrackSchema(
      episodeTrack.toDto(),
    );
    await mongoEpisodeTrack.save();
    return episodeTrack;
  }

  public async findByEpisode(episodeUuid: string): Promise<EpisodeTrack[]> {
    const mongoEpisodeTracks: Nullable<EpisodeTrackDto[]> =
      await this.mongoEpisodeTrackSchema.find({ episodeUuid });
    if (!mongoEpisodeTracks) return [];

    return mongoEpisodeTracks.map(
      (mongoEpisodeTrack) => new EpisodeTrack(mongoEpisodeTrack),
    );
  }
}
