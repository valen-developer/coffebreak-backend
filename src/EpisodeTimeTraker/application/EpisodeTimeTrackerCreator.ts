import { Injectable } from '@nestjs/common';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from '../domain/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerRepository } from '../domain/interfaces/EpisodeTimeTrackerRepository.interface';
import { EpisodeTimeTrackerFinder } from './EpisodeTimeTrackerFinder';
import { EpisodeTimeTrackerUpdater } from './EpisodeTimeTrackerUpdate';

@Injectable()
export class EpisodeTimeTrackerCreator {
  constructor(
    private timeTrackerRepository: EpisodeTimeTrackerRepository,
    private timeTrackerFinder: EpisodeTimeTrackerFinder,
    private timeTrackerUpdater: EpisodeTimeTrackerUpdater,
  ) {}

  public async create(dto: EpisodeTimeTrackerDTO): Promise<void> {
    const timeTrackerFound = await this.timeTrackerFinder
      .filter({
        episodeUuid_equals: dto.episodeUuid,
        userUuid_equals: dto.userUuid,
      })
      .then(({ trackers }) => trackers[0]);

    if (!timeTrackerFound) {
      await this.createTimeTracker(dto);
    }

    if (timeTrackerFound) {
      await this.timeTrackerUpdater.update({
        ...dto,
        uuid: timeTrackerFound.uuid.value,
        createdAt: timeTrackerFound.createdAt.value,
        updatedAt: new Date(),
      });
    }
  }

  private async createTimeTracker(
    dto: EpisodeTimeTrackerDTO,
  ): Promise<EpisodeTimeTracker> {
    const timeTracker = new EpisodeTimeTracker({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.timeTrackerRepository.save(timeTracker);

    return timeTracker;
  }
}
