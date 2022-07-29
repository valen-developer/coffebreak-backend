import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PodcastEpisodeSwaggerModel } from './infrastructure/PodcastEpisodeSwaggerModel';
import { Paginated } from 'src/helpers/types/Paginated';
import { Union } from 'src/helpers/types/Union.type';
import { Paginator } from 'src/Shared/domain/interfaces/Paginator.interface';
import { PodcastEpisodeFinder } from './application/PodcastEpisodeFinder';
import { PodcastEpisodeDTO } from './domain/PodcastEpisode.model';
import { PodcastEpisodeQuery } from './domain/PodcastEpisodeQuery';

@Controller('episode')
@ApiTags('Episode')
export class PodcastEpisodeController {
  constructor(private episodeFinder: PodcastEpisodeFinder) {}

  @Post('filter')
  @ApiResponse({
    status: 200,
    type: [PodcastEpisodeSwaggerModel],
    description: 'list of episodes',
  })
  public async filter(
    @Body() body: Union<PodcastEpisodeQuery, Paginator<PodcastEpisodeDTO>>,
  ): Promise<Paginated<PodcastEpisodeDTO[], 'episodes'>> {
    const query = { ...body };
    const paginator = { ...body };

    const { episodes, pages } = await this.episodeFinder.filterPaginated(
      query,
      paginator,
    );

    return {
      episodes: episodes.map((ep) => ep.toDTO()),
      pages,
    };
  }
}
