import { Controller, Get, Param } from '@nestjs/common';
import { PodcastEpisodeDTO } from 'src/Podcast/domain/PodcastEpisode.model';
import { ArtistFinder } from './application/ArtistFinder';
import { ArtistDTO } from './domain/Artist.model';

@Controller('artist')
export class ArtistController {
  constructor(private artistFinder: ArtistFinder) {}

  @Get('all')
  public async getAll(): Promise<ArtistDTO[]> {
    const artists = await this.artistFinder.findAll();
    return artists.map((a) => a.toDto());
  }

  @Get(':uuid/episodes')
  public async getEpisodes(
    @Param('uuid') uuid: string,
  ): Promise<PodcastEpisodeDTO[]> {
    const episodes = await this.artistFinder.findEpisodes(uuid);
    return episodes.map((e) => e.toDTO());
  }
}
