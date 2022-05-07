import { IvooxPodcastExtractor } from "../../../../context/PodcastApp/Podcast/infrastructure/IvooxPodcastExtractor";
import { NodeCronJob } from "../../../../context/PodcastApp/Shared/infrastructure/NodeCronJob";
import { NodeFetchHttpClient } from "../../../../context/PodcastApp/Shared/infrastructure/NodeFetchHttpClient";
import { Container } from "./Container";

export enum UtilDependencies {
  CronJob = "CronJob",
  HttpClient = "HttpClient",
  PodcastExtractor = "PodcastExtractor",
}

export const injectUtils = () => {
  const container = Container.getInstance();

  container.register(UtilDependencies.CronJob, () => new NodeCronJob());

  container.register(
    UtilDependencies.HttpClient,
    () => new NodeFetchHttpClient()
  );

  container.register(
    UtilDependencies.PodcastExtractor,
    () => new IvooxPodcastExtractor()
  );
};
