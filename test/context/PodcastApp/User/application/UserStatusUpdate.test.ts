/**
 * should be able to update user status from active to inactive
 * should be able to update user status from inactive to active
 * should throw an error if the user is not found
 * should receive correct user status after update
 */

import { UserStatusUpdater } from "../../../../../src/context/PodcastApp/User/application/UserStatusUpdater";
import { NotFoundUserException } from "../../../../../src/context/PodcastApp/User/domain/exceptions/NotUserFound.exception";
import { USER_STATUS } from "../../../../../src/context/PodcastApp/User/domain/valueObject/UserStatus.valueObject";
import { FakeUserRepository } from "../infrastructure/FakeUserRepository";
import { UserStub } from "../infrastructure/UserStub";

const userRepository = new FakeUserRepository();

beforeEach(async () => {
  // clear user repository
  userRepository.clear();
});

describe("UserStatusUpdater", () => {
  test("should be able to update user status from active to inactive", async () => {
    const userStatusUpdater = new UserStatusUpdater(userRepository);
    const user = await userRepository.save(
      UserStub.create({ status: USER_STATUS.ACTIVE })
    );
    const updatedUser = await userStatusUpdater.deactivateUser(user.uuid.value);

    expect(updatedUser.status.isActive()).toEqual(false);
  });

  test("should be able to update user status from inactive to active", async () => {
    const userStatusUpdater = new UserStatusUpdater(userRepository);
    const user = await userRepository.save(
      UserStub.create({ status: USER_STATUS.INACTIVE })
    );
    const updatedUser = await userStatusUpdater.activateUser(user.uuid.value);

    expect(updatedUser.status.isActive()).toEqual(true);
  });

  test("should throw an error if the user is not found", async () => {
    const userStatusUpdater = new UserStatusUpdater(userRepository);
    userStatusUpdater
      .activateUser("invalid-uuid")
      .catch((error) => expect(error).toBeInstanceOf(NotFoundUserException));
  });
});
