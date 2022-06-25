/**
 * should be able to update only name
 * should be able to update only email
 */

import { ImageUpdater } from "../../../../../src/context/PodcastApp/Image/application/ImageUpdater";
import { Fakerjs } from "../../../../../src/context/PodcastApp/Shared/infrastructure/Fakerjs";
import { FsFileUploader } from "../../../../../src/context/PodcastApp/Shared/infrastructure/FsFileUploader";
import { NanoUuidGenerator } from "../../../../../src/context/PodcastApp/Shared/infrastructure/NanoUuidGenerator";
import { UserUpdater } from "../../../../../src/context/PodcastApp/User/application/UserUpdater";
import { FakeImageRepository } from "../../Image/infrastructure/FakeImageRepository";
import { FakeUserRepository } from "../infrastructure/FakeUserRepository";
import { UserStub } from "../infrastructure/UserStub";

const userRepository = new FakeUserRepository();
const userUpdater = new UserUpdater(
  userRepository,
  new FsFileUploader(),
  new NanoUuidGenerator(),
  new ImageUpdater(new FakeImageRepository())
);

beforeEach(() => {
  userRepository.clear();
});

describe("UserUpdater", () => {
  test("should be able to update only name", async () => {
    const user = await userRepository.save(UserStub.create());
    await userUpdater.update({
      uuid: user.uuid.value,
      name: "new name",
    });
    const userFinded = await userRepository.findByUuid(user.uuid.value);

    expect(userFinded.name.value).toEqual("new name");
    expect(userFinded.email.value).toEqual(user.email.value);
  });

  test("should be able to update only email", async () => {
    const user = await userRepository.save(UserStub.create());
    const newWEmail = new Fakerjs().email();
    await userUpdater.update({
      uuid: user.uuid.value,
      email: newWEmail,
    });
    const userFinded = await userRepository.findByUuid(user.uuid.value);

    expect(userFinded.name.value).toEqual(user.name.value);
    expect(userFinded.email.value).toEqual(newWEmail);
  });
});
