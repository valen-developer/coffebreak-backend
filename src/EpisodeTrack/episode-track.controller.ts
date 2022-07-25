import { Controller, Get, Param } from '@nestjs/common';
import { EpisodeTrackFinder } from './application/EpisodeTrackFinder';
import { EpisodeTrack, EpisodeTrackDto } from './domain/EpisodeTrack.model';

@Controller('episode-track')
export class EpisodeTrackController {
  constructor(private trackFinder: EpisodeTrackFinder) {}

  @Get('episode/:episodeUuid')
  public async findByEpisode(
    @Param('episodeUuid') episodeUuid: string,
  ): Promise<EpisodeTrackDto[]> {
    const tracks = await this.trackFinder.findByEpisode(episodeUuid);

    return tracks.map((track) => track.toDto());
  }
}
