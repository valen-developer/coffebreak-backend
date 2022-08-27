import { Injectable } from '@nestjs/common';
import { EpisodeTimeTracker } from '../domain/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerFinder } from './EpisodeTimeTrackerFinder';

@Injectable()
export class EpisodeTimeTrackerLastEarsFinder {
  constructor(private timeTrackerFinder: EpisodeTimeTrackerFinder) {}

  public async findByUser(userUuid?: string): Promise<EpisodeTimeTracker[]> {
    const timeTrackers = await this.timeTrackerFinder.filter(
      {
        ...(userUuid ? { userUuid_equals: userUuid } : {}),
      },
      {
        page: 1,
        sort_by: 'updatedAt',
        order: 'desc',
      },
    );

    return timeTrackers.trackers;
  }
}
