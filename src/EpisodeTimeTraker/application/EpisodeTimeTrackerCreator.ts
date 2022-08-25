import { Injectable } from '@nestjs/common';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from '../domain/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerRepository } from '../domain/interfaces/EpisodeTimeTrackerRepository.interface';

@Injectable()
export class EpisodeTimeTrackerCreator {
  constructor(
    private episodeTimeTrackerRepository: EpisodeTimeTrackerRepository,
  ) {}

  public async create(dto: EpisodeTimeTrackerDTO): Promise<void> {
    const timeTracker = new EpisodeTimeTracker(dto);
    await this.episodeTimeTrackerRepository.save(timeTracker);
  }
}
