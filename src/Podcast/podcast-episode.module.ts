import { Module, Provider } from '@nestjs/common';
import { PodcastEpisodeFinder } from './application/PodcastEpisodeFinder';
import { PodcastExtractorCrontab } from './application/PodcastExtractorCrontab';
import { PodcastEpisodeRepository } from './domain/interfaces/PodcastEpisodeRepository.interface';
import { PodcastExtractor } from './domain/interfaces/PodcastExtractor.interface';
import { IvooxPodcastExtractor } from './infrastructure/IvooxPodcastExtractor';
import { MongoPodcastEpisodeRepository } from './infrastructure/MongoPodcastEpisodeRepository';

const providers: Provider[] = [
  {
    provide: PodcastEpisodeRepository,
    useClass: MongoPodcastEpisodeRepository,
  },
  {
    provide: PodcastExtractor,
    useClass: IvooxPodcastExtractor,
  },
];

const useCases = [PodcastEpisodeFinder, PodcastExtractorCrontab];

@Module({
  providers: [...providers, ...useCases],
})
export class PodcastEpisodeModule {}
