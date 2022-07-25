import { Injectable } from '@nestjs/common';
import { EpisodeTrack } from '../domain/EpisodeTrack.model';
import { EpisodeTrackRepository } from '../domain/interfaces/EpisodeTrackRepository.interface';

@Injectable()
export class EpisodeTrackFinder {
  constructor(private trackRepository: EpisodeTrackRepository) {}

  public async findByEpisode(episodeUuid: string): Promise<EpisodeTrack[]> {
    return this.trackRepository.findByEpisode(episodeUuid);
  }
}
