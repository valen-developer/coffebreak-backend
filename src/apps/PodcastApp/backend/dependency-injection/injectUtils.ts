import { IvooxPodcastExtractor } from "../../../../context/PodcastApp/Podcast/infrastructure/IvooxPodcastExtractor";
import { FormidableFormDataParser } from "../../../../context/PodcastApp/Shared/infrastructure/FormidableFormDataParser";
import { FsFileUploader } from "../../../../context/PodcastApp/Shared/infrastructure/FsFileUploader";
import { MongoQueryBuilder } from "../../../../context/PodcastApp/Shared/infrastructure/MongoQueryBuilder";
import { NanoUuidGenerator } from "../../../../context/PodcastApp/Shared/infrastructure/NanoUuidGenerator";
import { NodeCronJob } from "../../../../context/PodcastApp/Shared/infrastructure/NodeCronJob";
import { NodeFetchHttpClient } from "../../../../context/PodcastApp/Shared/infrastructure/NodeFetchHttpClient";
import { Container } from "./Container";

export enum UtilDependencies {
  CronJob = "CronJob",
  HttpClient = "HttpClient",
  PodcastExtractor = "PodcastExtractor",
  UuidGenerator = "UuidGenerator",
  QueryBuilder = "QueryBuilder",
  FormDataParser = "FormDataParser",
  FileUploader = "FileUploader",
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

  container.register(
    UtilDependencies.UuidGenerator,
    () => new NanoUuidGenerator()
  );

  container.register(
    UtilDependencies.QueryBuilder,
    () => new MongoQueryBuilder()
  );

  container.register(
    UtilDependencies.FormDataParser,
    () => new FormidableFormDataParser()
  );

  container.register(UtilDependencies.FileUploader, () => new FsFileUploader());
};
