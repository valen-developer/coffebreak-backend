import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { Paginated } from 'src/helpers/types/Paginated';
import { Union } from 'src/helpers/types/Union.type';
import { PodcastEpisodeDTO } from 'src/Podcast/domain/PodcastEpisode.model';
import { PodcastEpisodeSwaggerModel } from 'src/Podcast/infrastructure/PodcastEpisodeSwaggerModel';
import { Paginator } from 'src/Shared/domain/interfaces/Paginator.interface';
import { ArtistFinder } from './application/ArtistFinder';
import { ArtistDTO } from './domain/Artist.model';
import { ArtistQuery } from './domain/ArtistQuery';
import { ArtistSwaggerModel } from './infrastructure/ArtistSwaggerModel';

@Controller('artist')
@ApiBearerAuth()
@ApiTags('Artist')
export class ArtistController {
  constructor(private artistFinder: ArtistFinder) {}

  @Get('all')
  @ApiResponse({
    status: 200,
    type: [ArtistSwaggerModel],
    description: 'list of artists',
  })
  public async getAll(): Promise<ArtistDTO[]> {
    const artists = await this.artistFinder.findAll();
    return artists.map((a) => a.toDto());
  }

  @Get(':uuid')
  @ApiResponse({ status: 200, type: ArtistSwaggerModel, description: 'artist' })
  public async get(@Param('uuid') uuid: string): Promise<ArtistDTO> {
    const artist = await this.artistFinder.find(uuid);
    return artist.toDto();
  }

  @Get(':uuid/episodes')
  @ApiResponse({
    status: 200,
    type: [PodcastEpisodeSwaggerModel],
    description: 'list of episodes linked to an artist',
  })
  public async getEpisodes(
    @Param('uuid') uuid: string,
  ): Promise<PodcastEpisodeDTO[]> {
    const episodes = await this.artistFinder.findEpisodes(uuid);
    return episodes.map((e) => e.toDTO());
  }

  @Post('filter')
  @ApiResponse({
    status: 200,
    type: [ArtistSwaggerModel],
    description: 'list of artists',
  })
  public async filter(
    @Body() query: Union<ArtistQuery, Paginator<ArtistDTO>>,
  ): Promise<Paginated<ArtistDTO[], 'artists'>> {
    const paginatedArtists = await this.artistFinder.filter(query);

    return paginatedArtists;
  }
}
