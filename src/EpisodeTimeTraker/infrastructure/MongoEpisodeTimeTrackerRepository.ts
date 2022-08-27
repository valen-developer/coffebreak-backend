import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nullable } from 'src/helpers/types/Nullable.type';
import { Paginated } from 'src/helpers/types/Paginated';
import { PAGE_SIZE } from 'src/Shared/constansts/PageSize.constant';
import { NotFoundException } from 'src/Shared/domain/exceptions/NotFound.exception';

import { Paginator } from 'src/Shared/domain/interfaces/Paginator.interface';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from '../domain/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerRepository } from '../domain/interfaces/EpisodeTimeTrackerRepository.interface';
import {
  EpisodeTimeTrackerDocument,
  EPISODE_TIME_TRACKER_NAME,
} from './MongoEpisodeTimeTrackerSchema';

@Injectable()
export class MongoEpisodeTrackRepository
  implements EpisodeTimeTrackerRepository
{
  constructor(
    @InjectModel(EPISODE_TIME_TRACKER_NAME)
    private mongoEpisodeTimeTracker: Model<EpisodeTimeTrackerDocument>,
  ) {}

  public async save(episodeTimeTracker: EpisodeTimeTracker): Promise<void> {
    const episodeTimeTrackerDocument = new this.mongoEpisodeTimeTracker(
      episodeTimeTracker.toDto(),
    );

    await episodeTimeTrackerDocument.save();
  }

  public async update(episodeTimeTracker: EpisodeTimeTracker): Promise<void> {
    const episodeTimeTrackerDto: Nullable<EpisodeTimeTrackerDTO> =
      await this.mongoEpisodeTimeTracker.findOneAndUpdate(
        { uuid: episodeTimeTracker.uuid.value },
        episodeTimeTracker.toDto(),
        { new: true },
      );

    // TODO: custom error
    if (!episodeTimeTrackerDto)
      throw new NotFoundException('Episode time tracker not found');
  }

  public async find(uuid: string): Promise<EpisodeTimeTracker> {
    const episodeTimeTrackerDto: Nullable<EpisodeTimeTrackerDTO> =
      await this.mongoEpisodeTimeTracker.findOne({ uuid });

    //TODO: custom error
    if (!episodeTimeTrackerDto)
      throw new NotFoundException('Episode time tracker not found');

    return new EpisodeTimeTracker(episodeTimeTrackerDto);
  }

  public async findByEpisode(
    episodeUuid: string,
  ): Promise<EpisodeTimeTracker[]> {
    const episodeTimeTrackerDto: Nullable<EpisodeTimeTrackerDTO[]> =
      await this.mongoEpisodeTimeTracker.find({ episodeUuid });

    // TODO: custom error
    if (!episodeTimeTrackerDto)
      throw new NotFoundException('Episode time tracker not found');

    return episodeTimeTrackerDto.map(
      (episodeTimeTrackerDto) => new EpisodeTimeTracker(episodeTimeTrackerDto),
    );
  }

  public async findByUser(userUuid: string): Promise<EpisodeTimeTracker[]> {
    const episodeTimeTrackerDto: Nullable<EpisodeTimeTrackerDTO[]> =
      await this.mongoEpisodeTimeTracker.find({ userUuid });

    //TODO: custom error
    if (!episodeTimeTrackerDto)
      throw new NotFoundException('Episode time tracker not found');

    return episodeTimeTrackerDto.map(
      (episodeTimeTrackerDto) => new EpisodeTimeTracker(episodeTimeTrackerDto),
    );
  }

  public async filter(
    query: any,
    paginator: Paginator<EpisodeTimeTrackerDTO>,
  ): Promise<Paginated<EpisodeTimeTracker[], 'trackers'>> {
    const { page, sort_by, order } = paginator;
    const pageSize = PAGE_SIZE;
    const skip = page ? (page - 1) * pageSize : 0;
    const limit = page ? pageSize : Infinity;

    const episodeTimeTrackerDto: Nullable<EpisodeTimeTrackerDTO[]> =
      await this.mongoEpisodeTimeTracker
        .find(query)
        .sort({ [sort_by ?? 'time']: order ?? 'asc' })
        .skip(skip)
        .limit(limit);

    const timeTrackers = episodeTimeTrackerDto.map(
      (episodeTimeTrackerDto) => new EpisodeTimeTracker(episodeTimeTrackerDto),
    );

    const count = await this.count(query);
    const totalPages = Math.ceil(count / pageSize);

    return {
      trackers: timeTrackers,
      pages: totalPages,
    };
  }

  public async count(query: any): Promise<number> {
    return this.mongoEpisodeTimeTracker.countDocuments(query);
  }

  public async delete(uuid: string): Promise<void> {
    await this.mongoEpisodeTimeTracker.deleteOne({ uuid });
  }
}
