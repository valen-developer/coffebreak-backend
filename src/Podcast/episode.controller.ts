import { Body, Controller, Get } from '@nestjs/common';
import { Union } from 'src/helpers/types/Union.type';
import { Paginator } from 'src/Shared/domain/interfaces/Paginator.interface';
import { PodcastEpisodeFinder } from './application/PodcastEpisodeFinder';
import { PodcastEpisodeDTO } from './domain/PodcastEpisode.model';
import { PodcastEpisodeQuery } from './domain/PodcastEpisodeQuery';

@Controller('episode')
export class PodcastEpisodeController {
  constructor(private episodeFinder: PodcastEpisodeFinder) {}

  @Get('filter')
  public async filter(
    @Body() body: Union<PodcastEpisodeQuery, Paginator<PodcastEpisodeDTO>>,
  ): Promise<PodcastEpisodeDTO[]> {
    const query = { ...body };
    const paginator = { ...body };

    const episodes = await this.episodeFinder.filter(query, paginator);

    return episodes.map((ep) => ep.toDTO());
  }
}
