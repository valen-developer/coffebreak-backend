import { Module, Provider } from '@nestjs/common';
import { PlaylistCreator } from './application/PlaylistCreator';
import { PlaylistDeleter } from './application/PlaylistDeleter';
import { PlaylistDuplicator } from './application/PlaylistDuplicator';
import { PlaylistEpisodeUpdater } from './application/PlaylistEpisodeUpdater';
import { PlaylistFinder } from './application/PlaylistFinder';
import { PlaylistTematicCreator } from './application/PlaylistTematicCreator';
import { PlaylistUpdater } from './application/PlaylistUpdater';
import { PlaylistRepository } from './domain/interfaces/PlaylistRepository.interface';
import { MongoPlaylistRepository } from './infrastructure/MongoPlaylistRepository/MongoPlaylistRepository';

const providers: Provider[] = [
  {
    provide: PlaylistRepository,
    useClass: MongoPlaylistRepository,
  },
];

const useCases = [
  PlaylistCreator,
  PlaylistDeleter,
  PlaylistDuplicator,
  PlaylistEpisodeUpdater,
  PlaylistFinder,
  PlaylistTematicCreator,
  PlaylistUpdater,
];

@Module({
  providers: [...providers, ...useCases],
})
export class PlaylistModule {}
