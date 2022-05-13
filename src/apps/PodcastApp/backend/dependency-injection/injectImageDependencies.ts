import { ImageCreator } from "../../../../context/PodcastApp/Image/application/ImageCreator";
import { ImageDeleter } from "../../../../context/PodcastApp/Image/application/ImageDeleter";
import { ImageFinder } from "../../../../context/PodcastApp/Image/application/ImageFinder";

import { ImageRepository } from "../../../../context/PodcastApp/Image/domain/interfaces/ImageRepository.interface";

import { Container } from "./Container";
import { Repositories } from "./injectRepositories";

export enum ImageDependencies {
  ImageFinder = "ImageFinder",
  ImageDeleter = "ImageDeleter",
  ImageCreator = "ImageCreator",
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
    () => new ImageDeleter(imageRepository)
  );

  container.register(
    ImageDependencies.ImageCreator,
    () => new ImageCreator(imageRepository)
  );
};
