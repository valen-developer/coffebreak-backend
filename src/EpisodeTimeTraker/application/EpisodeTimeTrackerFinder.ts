import { Injectable } from '@nestjs/common';

import { NotFoundException } from 'src/Shared/domain/exceptions/NotFound.exception';
import { Paginator } from 'src/Shared/domain/interfaces/Paginator.interface';
import { QueryBuilder } from 'src/Shared/domain/interfaces/QueryBuilder.interface';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from '../domain/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerQuery } from '../domain/EpisodeTimeTrackerQuery';
import { EpisodeTimeTrackerRepository } from '../domain/interfaces/EpisodeTimeTrackerRepository.interface';

@Injectable()
export class EpisodeTimeTrackerFinder {
  constructor(
    private episodeTimeTrackerRepository: EpisodeTimeTrackerRepository,
    private queryBuilder: QueryBuilder,
  ) {}

  public async filter(
    query: EpisodeTimeTrackerQuery,
    paginator: Paginator<EpisodeTimeTrackerDTO> = {},
  ): Promise<EpisodeTimeTracker[]> {
    const queryBuilt = this.queryBuilder.build(query);

    return await this.episodeTimeTrackerRepository.filter(
      queryBuilt,
      paginator,
    );
  }

  public async find(uuid: string): Promise<EpisodeTimeTracker> {
    const timeTracker = await this.episodeTimeTrackerRepository.find(uuid);

    if (!timeTracker) {
      // TODO: custom error
      throw new NotFoundException('Time tracker not found');
    }

    return timeTracker;
  }

  public async findByEpisode(
    episodeUuid: string,
  ): Promise<EpisodeTimeTracker[]> {
    const timeTrackers = await this.episodeTimeTrackerRepository.findByEpisode(
      episodeUuid,
    );

    if (!timeTrackers) {
      // TODO: custom error
      throw new NotFoundException('Time tracker not found');
    }

    return timeTrackers;
  }

  public async findByUser(userUuid: string): Promise<EpisodeTimeTracker[]> {
    const timeTrackers = await this.episodeTimeTrackerRepository.findByUser(
      userUuid,
    );

    if (!timeTrackers) {
      throw new NotFoundException('Time tracker not found');
    }

    return timeTrackers;
  }
}
