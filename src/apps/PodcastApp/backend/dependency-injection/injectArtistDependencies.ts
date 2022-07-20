import { ArtistCreator } from "../../../../context/PodcastApp/Artist/application/ArtistCreator";
import { ArtistCreatorForExtraction } from "../../../../context/PodcastApp/Artist/application/ArtistCreatorForExtraction";
import { ArtistExtractoCrontab } from "../../../../context/PodcastApp/Artist/application/ArtistExtractorCrontab";
import { ArtistFinder } from "../../../../context/PodcastApp/Artist/application/ArtistFinder";
import { ArtistUpdater } from "../../../../context/PodcastApp/Artist/application/ArtistUpdater";
import { ArtistExtractor } from "../../../../context/PodcastApp/Artist/domain/interfaces/ArtistExtractor.interface";
import { FtpArtistExtractor } from "../../../../context/PodcastApp/Artist/infrastructure/FtpArtistExtractor";
import { MongoArtistRepository } from "../../../../context/PodcastApp/Artist/infrastructure/MongoArtistRepository/MongoArtistRepository";
import { PodcastEpisodeFinder } from "../../../../context/PodcastApp/Podcast/application/PodcastEpisodeFinder";
import { CronJob } from "../../../../context/PodcastApp/Shared/domain/interfaces/Cronjob.interface";
import { QueryBuilder } from "../../../../context/PodcastApp/Shared/domain/interfaces/QueryBuilder.interface";
import { Container } from "./Container";
import { PodcastEpisodeDependencies } from "./injectPodcastEpisodiesDependencies";
import { UtilDependencies } from "./injectUtils";

export const enum ArtistDependencies {
  ArtistExtractor = "ArtistExtractor",
  ArtistFinder = "ArtistFinder",
  ArtistCreator = "ArtistCreator",
  ArtistUpdater = "ArtistUpdater",
  ArtistRepository = "ArtistRepository",
  ArtistCreatorForExtraction = "ArtistCreatorForExtraction",
  ArtistExtractorCrontab = "ArtistExtractorCrontab",
}

export const injectArtistDependencies = () => {
  const container = Container.getInstance();

  const artistRepository = new MongoArtistRepository();

  // repository
  container.register(
    ArtistDependencies.ArtistRepository,
    () => artistRepository
  );

  // finder
  container.register(
    ArtistDependencies.ArtistFinder,
    () =>
      new ArtistFinder(
        artistRepository,
        container.get<QueryBuilder>(UtilDependencies.QueryBuilder),
        container.get<PodcastEpisodeFinder>(
          PodcastEpisodeDependencies.PodcastEpisodeFinder
        )
      )
  );

  // creator
  container.register(
    ArtistDependencies.ArtistCreator,
    () => new ArtistCreator(artistRepository)
  );

  // updater
  container.register(
    ArtistDependencies.ArtistUpdater,
    () => new ArtistUpdater(artistRepository)
  );

  // creator for extraction
  container.register(
    ArtistDependencies.ArtistCreatorForExtraction,
    () =>
      new ArtistCreatorForExtraction(
        artistRepository,
        container.get(UtilDependencies.QueryBuilder),
        container.get(UtilDependencies.UuidGenerator)
      )
  );

  container.register(
    ArtistDependencies.ArtistExtractor,
    () =>
      new FtpArtistExtractor(
        container.get<PodcastEpisodeFinder>(
          PodcastEpisodeDependencies.PodcastEpisodeFinder
        ),
        container.get<ArtistCreatorForExtraction>(
          ArtistDependencies.ArtistCreatorForExtraction
        )
      )
  );

  container.register(
    ArtistDependencies.ArtistExtractorCrontab,
    () =>
      new ArtistExtractoCrontab(
        container.get<CronJob>(UtilDependencies.CronJob),
        container.get<ArtistExtractor>(ArtistDependencies.ArtistExtractor)
      )
  );
};
