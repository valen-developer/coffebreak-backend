import { ImageCreator } from "../../../../context/PodcastApp/Image/application/ImageCreator";
import { ImageDeleter } from "../../../../context/PodcastApp/Image/application/ImageDeleter";
import { ImageDuplicator } from "../../../../context/PodcastApp/Image/application/ImageDuplicator";
import { ImageFinder } from "../../../../context/PodcastApp/Image/application/ImageFinder";
import { ImageUpdater } from "../../../../context/PodcastApp/Image/application/ImageUpdater";

import { ImageRepository } from "../../../../context/PodcastApp/Image/domain/interfaces/ImageRepository.interface";

import { Container } from "./Container";
import { Repositories } from "./injectRepositories";
import { UtilDependencies } from "./injectUtils";

export enum ImageDependencies {
  ImageFinder = "ImageFinder",
  ImageDeleter = "ImageDeleter",
  ImageCreator = "ImageCreator",
  ImageUpdater = "ImageUpdater",
  ImageDuplicator = "ImageDuplicator",
}

export const injectImageDependencies = () => {
  const container = Container.getInstance();

  const imageRepository = container.get<ImageRepository>(
    Repositories.ImageRepository
  );

  container.register(
    ImageDependencies.ImageFinder,
    () => new ImageFinder(imageRepository)
  );

  container.register(
    ImageDependencies.ImageDeleter,
    () =>
      new ImageDeleter(
        imageRepository,
        container.get(UtilDependencies.FileUploader)
      )
  );

  container.register(
    ImageDependencies.ImageCreator,
    () => new ImageCreator(imageRepository)
  );

  container.register(
    ImageDependencies.ImageUpdater,
    () => new ImageUpdater(imageRepository)
  );

  container.register(
    ImageDependencies.ImageDuplicator,
    () =>
      new ImageDuplicator(
        imageRepository,
        container.get(UtilDependencies.UuidGenerator),
        container.get(UtilDependencies.FileUploader)
      )
  );
};
