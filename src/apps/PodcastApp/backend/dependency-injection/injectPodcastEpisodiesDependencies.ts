import { PodcastEpisodeFinder } from "../../../../context/PodcastApp/Podcast/application/PodcastEpisodeFinder";
import { PodcastExtractorCrontab } from "../../../../context/PodcastApp/Podcast/application/PodcastExtractorCrontab";
import { IvooxPodcastExtractor } from "../../../../context/PodcastApp/Podcast/infrastructure/IvooxPodcastExtractor";
import { Container } from "./Container";
import { Repositories } from "./injectRepositories";
import { UtilDependencies } from "./injectUtils";

export enum PodcastEpisodeDependencies {
  PodcastEpisodeFinder = "PodcastEpisodeFinder",
  PodcastExtractor = "PodcastExtractor",
  PodcastExtractorCronTab = "PodcastExtractorCronTab",
}

export const injectPodcastEpisodiesDependencies = () => {
  const container = Container.getInstance();

  container.register(
    PodcastEpisodeDependencies.PodcastEpisodeFinder,
    (c) =>
      new PodcastEpisodeFinder(
        c.get(Repositories.PodcastEpisodeRepository),
        c.get(UtilDependencies.QueryBuilder)
      )
  );

  container.register(
    PodcastEpisodeDependencies.PodcastExtractor,
    (c) => new IvooxPodcastExtractor()
  );

  container.register(
    PodcastEpisodeDependencies.PodcastExtractorCronTab,
    (c) =>
      new PodcastExtractorCrontab(
        c.get(UtilDependencies.HttpClient),
        c.get(UtilDependencies.UuidGenerator),
        c.get(UtilDependencies.CronJob),
        c.get(PodcastEpisodeDependencies.PodcastExtractor),
        c.get(PodcastEpisodeDependencies.PodcastEpisodeFinder),
        c.get(Repositories.PodcastEpisodeRepository),
        c.get(UtilDependencies.EventEmitter)
      )
  );
};
