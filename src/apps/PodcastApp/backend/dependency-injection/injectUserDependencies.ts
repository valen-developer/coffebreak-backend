import { ImageUpdater } from "../../../../context/PodcastApp/Image/application/ImageUpdater";
import { ICrypt } from "../../../../context/PodcastApp/Shared/domain/interfaces/Crypt.interface";
import { FileUploader } from "../../../../context/PodcastApp/Shared/domain/interfaces/FileUploader";
import { JWT } from "../../../../context/PodcastApp/Shared/domain/interfaces/JWT.interface";
import { UUIDGenerator } from "../../../../context/PodcastApp/Shared/domain/interfaces/UuidGenerator";
import { LoginUser } from "../../../../context/PodcastApp/User/application/LoginUser";
import { SignupUser } from "../../../../context/PodcastApp/User/application/SingupUser";
import { UserCreator } from "../../../../context/PodcastApp/User/application/UserCreator";
import { UserDeleter } from "../../../../context/PodcastApp/User/application/UserDeleter";
import { UserFinder } from "../../../../context/PodcastApp/User/application/UserFinder";
import { UserUpdater } from "../../../../context/PodcastApp/User/application/UserUpdater";
import { UserRepository } from "../../../../context/PodcastApp/User/domain/interfaces/UserRepository.interface";
import { Container } from "./Container";
import { ImageDependencies } from "./injectImageDependencies";
import { Repositories } from "./injectRepositories";
import { UtilDependencies } from "./injectUtils";

export const enum UserDependencies {
  SignupUser = "SignupUser",
  LoginUser = "LoginUser",
  UserCreator = "UserCreator",
  UserFinder = "UserFinder",
  UserDeleter = "UserDeleter",
  UserUpdater = "UserUpdater",
}

export const injectUserDependencies = () => {
  const container = Container.getInstance();

  const userRepository = container.get<UserRepository>(
    Repositories.UserRepository
  );

  const crypt = container.get<ICrypt>(UtilDependencies.Crypt);
  const jwt = container.get<JWT>(UtilDependencies.JWT);
  const fileUploader = container.get<FileUploader>(
    UtilDependencies.FileUploader
  );
  const uuidGenerator = container.get<UUIDGenerator>(
    UtilDependencies.UuidGenerator
  );
  const imageUpdater = container.get<ImageUpdater>(
    ImageDependencies.ImageUpdater
  );

  container.register(
    UserDependencies.UserCreator,
    () => new UserCreator(userRepository)
  );
  container.register(
    UserDependencies.UserDeleter,
    () => new UserDeleter(userRepository)
  );
  container.register(
    UserDependencies.UserFinder,
    () => new UserFinder(userRepository)
  );

  container.register(
    UserDependencies.UserUpdater,
    () =>
      new UserUpdater(userRepository, fileUploader, uuidGenerator, imageUpdater)
  );

  container.register(
    UserDependencies.SignupUser,
    (c) => new SignupUser(c.get(UserDependencies.UserCreator), crypt)
  );

  container.register(
    UserDependencies.LoginUser,
    (c) => new LoginUser(c.get(UserDependencies.UserCreator), crypt, jwt)
  );
};
