import { PlaylistCreator } from "../../../../context/PodcastApp/Playlist/application/PlaylistCreator";
import { PlaylistDeleter } from "../../../../context/PodcastApp/Playlist/application/PlaylistDeleter";
import { PlaylistDuplicator } from "../../../../context/PodcastApp/Playlist/application/PlaylistDuplicator";
import { PlaylistEpisodeUpdater } from "../../../../context/PodcastApp/Playlist/application/PlaylistEpisodeUpdater";
import { PlaylistFinder } from "../../../../context/PodcastApp/Playlist/application/PlaylistFinder";
import { PlaylistTematicCreator } from "../../../../context/PodcastApp/Playlist/application/PlaylistTematicCreator";
import { PlaylistUpdater } from "../../../../context/PodcastApp/Playlist/application/PlaylistUpdater";
import { PlaylistRepository } from "../../../../context/PodcastApp/Playlist/domain/interfaces/PlaylistRepository.interface";
import { Container } from "./Container";
import { ImageDependencies } from "./injectImageDependencies";
import { PodcastEpisodeDependencies } from "./injectPodcastEpisodiesDependencies";
import { Repositories } from "./injectRepositories";
import { UtilDependencies } from "./injectUtils";

export enum PlaylistUseCases {
  PlaylistCreator = "PlaylistCreator",
  PlaylistUpdater = "PlaylistUpdater",
  PlaylistDeleter = "PlaylistDeleter",
  PlaylistFinder = "PlaylistFinder",
  PlaylistEpisodesUpdater = "PlaylistEpisodesUpdater",
  PlaylistTematicCreator = "PlaylistTematicCreator",
  PlaylistDuplicator = "PlaylistDuplicator",
}

export const injectPlaylistDependencies = () => {
  const container = Container.getInstance();

  const playlistRepository = container.get<PlaylistRepository>(
    Repositories.PlaylistRepository
  );

  container.register(
    PlaylistUseCases.PlaylistCreator,
    (c) =>
      new PlaylistCreator(
        playlistRepository,
        c.get(ImageDependencies.ImageCreator),
        c.get(UtilDependencies.FileUploader),
        c.get(UtilDependencies.UuidGenerator)
      )
  );

  container.register(
    PlaylistUseCases.PlaylistUpdater,
    () => new PlaylistUpdater(playlistRepository)
  );

  container.register(
    PlaylistUseCases.PlaylistDeleter,
    () =>
      new PlaylistDeleter(
        playlistRepository,
        container.get(ImageDependencies.ImageDeleter)
      )
  );

  container.register(
    PlaylistUseCases.PlaylistFinder,
    (c) =>
      new PlaylistFinder(
        playlistRepository,
        c.get(PodcastEpisodeDependencies.PodcastEpisodeFinder),
        c.get(UtilDependencies.QueryBuilder)
      )
  );

  container.register(
    PlaylistUseCases.PlaylistEpisodesUpdater,
    (c) =>
      new PlaylistEpisodeUpdater(
        c.get(PlaylistUseCases.PlaylistFinder),
        c.get(PlaylistUseCases.PlaylistUpdater)
      )
  );

  container.register(
    PlaylistUseCases.PlaylistTematicCreator,
    (c) =>
      new PlaylistTematicCreator(
        c.get(PodcastEpisodeDependencies.PodcastEpisodeFinder),
        c.get(PlaylistUseCases.PlaylistCreator),
        c.get(UtilDependencies.UuidGenerator),
        c.get(UtilDependencies.EventEmitter)
      )
  );

  container.register(
    PlaylistUseCases.PlaylistDuplicator,
    (c) =>
      new PlaylistDuplicator(
        playlistRepository,
        c.get(ImageDependencies.ImageFinder),
        c.get(ImageDependencies.ImageDuplicator),
        c.get(UtilDependencies.UuidGenerator)
      )
  );
};
