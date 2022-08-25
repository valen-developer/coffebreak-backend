import { Injectable } from '@nestjs/common';
import { InvalidException } from 'src/Shared/domain/exceptions/Invalid.exception';
import { NotFoundException } from 'src/Shared/domain/exceptions/NotFound.exception';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from '../domain/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerRepository } from '../domain/interfaces/EpisodeTimeTrackerRepository.interface';

@Injectable()
export class EpisodeTimeTrackerUpdater {
  constructor(
    private episodeTimeTrackerRepository: EpisodeTimeTrackerRepository,
  ) {}

  public async update(params: EpisodeTimeTrackerDTO): Promise<any> {
    const timeTracker = await this.episodeTimeTrackerRepository.find(
      params.uuid,
    );

    if (!timeTracker) {
      // TODO: custom error
      throw new NotFoundException('Time tracker not found');
    }

    if (!this.isSameUser(timeTracker.userUuid.value, params.userUuid)) {
      // TODO: custom error
      throw new InvalidException(
        'You are not allowed to update this time tracker',
      );
    }

    const newTimeTracker = new EpisodeTimeTracker(params);

    await this.episodeTimeTrackerRepository.update(newTimeTracker);
  }

  private isSameUser(savedUserUuid: string, userUuid: string): boolean {
    return savedUserUuid === userUuid;
  }
}
