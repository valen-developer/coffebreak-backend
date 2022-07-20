import { ImageUpdater } from "../../../../context/PodcastApp/Image/application/ImageUpdater";
import { ICrypt } from "../../../../context/PodcastApp/Shared/domain/interfaces/Crypt.interface";
import { FileUploader } from "../../../../context/PodcastApp/Shared/domain/interfaces/FileUploader";
import { JWT } from "../../../../context/PodcastApp/Shared/domain/interfaces/JWT.interface";
import { UUIDGenerator } from "../../../../context/PodcastApp/Shared/domain/interfaces/UuidGenerator";
import { GoogleLogin } from "../../../../context/PodcastApp/User/application/GoogleLogin";
import { GoogleSignup } from "../../../../context/PodcastApp/User/application/GoogleSignup";
import { LoginUser } from "../../../../context/PodcastApp/User/application/LoginUser";
import { PasswordChanger } from "../../../../context/PodcastApp/User/application/PasswordChanger";
import { PasswordRecover } from "../../../../context/PodcastApp/User/application/PasswordRecover";
import { SignupUser } from "../../../../context/PodcastApp/User/application/SingupUser";
import { UserCreator } from "../../../../context/PodcastApp/User/application/UserCreator";
import { UserDeleter } from "../../../../context/PodcastApp/User/application/UserDeleter";
import { UserFinder } from "../../../../context/PodcastApp/User/application/UserFinder";
import { UserStatusUpdater } from "../../../../context/PodcastApp/User/application/UserStatusUpdater";
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
  UserStatusUpdater = "UserStatusUpdater",
  PasswordChanger = "PasswordChanger",
  GoogleSignup = "GoogleSignup",
  GoogleLogin = "GoogleLogin",
  PasswordRecover = "PasswordRecover",
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
    () =>
      new UserDeleter(
        userRepository,
        container.get(ImageDependencies.ImageDeleter)
      )
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
    (c) => new LoginUser(c.get(UserDependencies.UserFinder), crypt, jwt)
  );

  container.register(
    UserDependencies.UserStatusUpdater,
    (c) => new UserStatusUpdater(userRepository)
  );

  container.register(
    UserDependencies.PasswordChanger,
    () => new PasswordChanger(userRepository, crypt)
  );

  container.register(
    UserDependencies.GoogleSignup,
    (c) =>
      new GoogleSignup(
        userRepository,
        c.get(UtilDependencies.ImageDownloader),
        c.get(UtilDependencies.FileUploader),
        c.get(ImageDependencies.ImageCreator),
        uuidGenerator
      )
  );

  container.register(
    UserDependencies.GoogleLogin,
    (c) => new GoogleLogin(c.get(UserDependencies.UserFinder), jwt)
  );

  container.register(
    UserDependencies.PasswordRecover,
    (c) => new PasswordRecover(userRepository, crypt)
  );
};
