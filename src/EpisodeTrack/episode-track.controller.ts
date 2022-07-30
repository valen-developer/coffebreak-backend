import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { EpisodeTrackFinder } from './application/EpisodeTrackFinder';
import { EpisodeTrackDto } from './domain/EpisodeTrack.model';
import { EpisodeTrackSwaggerModel } from './infrastructure/EpisodeTrackSwaggerModel';

@Controller('episode-track')
@ApiBearerAuth()
@ApiTags('EpisodeTrack')
export class EpisodeTrackController {
  constructor(private trackFinder: EpisodeTrackFinder) {}

  @Get('episode/:episodeUuid')
  @ApiResponse({ status: 200, type: EpisodeTrackSwaggerModel })
  public async findByEpisode(
    @Param('episodeUuid') episodeUuid: string,
  ): Promise<EpisodeTrackDto[]> {
    const tracks = await this.trackFinder.findByEpisode(episodeUuid);

    return tracks.map((track) => track.toDto());
  }
}
