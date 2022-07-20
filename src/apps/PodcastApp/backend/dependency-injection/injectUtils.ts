import { IvooxPodcastExtractor } from "../../../../context/PodcastApp/Podcast/infrastructure/IvooxPodcastExtractor";
import { ImageDownloader } from "../../../../context/PodcastApp/Shared/application/ImageDownloader";
import { TempDirCleaner } from "../../../../context/PodcastApp/Shared/application/TempDirCleaner";
import { BCrypt } from "../../../../context/PodcastApp/Shared/infrastructure/BCrypt";
import { FormidableFormDataParser } from "../../../../context/PodcastApp/Shared/infrastructure/FormidableFormDataParser";
import { FsFileUploader } from "../../../../context/PodcastApp/Shared/infrastructure/FsFileUploader";
import { JsonWebTokenJWT } from "../../../../context/PodcastApp/Shared/infrastructure/JsonWebTokenJWT";
import { MongoQueryBuilder } from "../../../../context/PodcastApp/Shared/infrastructure/MongoQueryBuilder";
import { NanoUuidGenerator } from "../../../../context/PodcastApp/Shared/infrastructure/NanoUuidGenerator";
import { NativeEventEmitter } from "../../../../context/PodcastApp/Shared/infrastructure/NativeEventEmitter";
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
  Crypt = "Crypt",
  JWT = "JWT",
  EventEmitter = "EventEmitter",
  TempDirCleaner = "TempDirCleaner",
  ImageDownloader = "ImageDownloader",
  FtpClient = "FtpClient",
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

  container.register(UtilDependencies.Crypt, () => new BCrypt());

  container.register(UtilDependencies.JWT, () => new JsonWebTokenJWT());

  container.register(
    UtilDependencies.EventEmitter,
    () => new NativeEventEmitter()
  );

  container.register(
    UtilDependencies.TempDirCleaner,
    () => new TempDirCleaner(container.get(UtilDependencies.CronJob))
  );

  container.register(
    UtilDependencies.ImageDownloader,
    () => new ImageDownloader(container.get(UtilDependencies.HttpClient))
  );
};
