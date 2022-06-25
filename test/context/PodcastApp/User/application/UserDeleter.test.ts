/**
 * should delete a user and not be able to find it
 */

import { ImageDeleter } from "../../../../../src/context/PodcastApp/Image/application/ImageDeleter";
import { UserDeleter } from "../../../../../src/context/PodcastApp/User/application/UserDeleter";
import { UserFinder } from "../../../../../src/context/PodcastApp/User/application/UserFinder";
import { NotFoundUserException } from "../../../../../src/context/PodcastApp/User/domain/exceptions/NotUserFound.exception";
import { FakeImageRepository } from "../../Image/infrastructure/FakeImageRepository";
import { FakeFileUploader } from "../../Shared/infrastructure/FakeFileUploader";
import { FakeUserRepository } from "../infrastructure/FakeUserRepository";
import { UserStub } from "../infrastructure/UserStub";

const userRepository = new FakeUserRepository();

describe("UserDeleter", () => {
  test("should delete a user and not be able to find it", async () => {
    const user = await userRepository.save(UserStub.create());
    const userDeleter = new UserDeleter(
      userRepository,
      new ImageDeleter(new FakeImageRepository(), new FakeFileUploader())
    );
    await userDeleter.delete(user.uuid.value);
    const userFinder = new UserFinder(userRepository);
    userFinder
      .findByUuid(user.uuid.value)
      .catch((error) => expect(error).toBeInstanceOf(NotFoundUserException));
  });
});
