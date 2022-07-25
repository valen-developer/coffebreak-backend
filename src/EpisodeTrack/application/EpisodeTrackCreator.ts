import { Injectable } from '@nestjs/common';

import { EpisodeTrack, EpisodeTrackDto } from '../domain/EpisodeTrack.model';
import { EpisodeTrackRepository } from '../domain/interfaces/EpisodeTrackRepository.interface';

@Injectable()
export class EpisodeTrackCreator {
  constructor(private trackRepository: EpisodeTrackRepository) {}

  public async create(episodeTrack: EpisodeTrackDto): Promise<EpisodeTrack> {
    return this.trackRepository.save(new EpisodeTrack(episodeTrack));
  }
}
