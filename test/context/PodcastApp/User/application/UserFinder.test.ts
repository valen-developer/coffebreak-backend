/**
 * should be able to find a user by uuid
 * should be able to find a user by email
 * should throw an error if the user is not found by uuid
 * should throw an error if the user is not found by email
 */

import { UserFinder } from "../../../../../src/context/PodcastApp/User/application/UserFinder";
import { NotFoundUserException } from "../../../../../src/context/PodcastApp/User/domain/exceptions/NotUserFound.exception";
import { User } from "../../../../../src/context/PodcastApp/User/domain/User.mode";
import { FakeUserRepository } from "../infrastructure/FakeUserRepository";
import { UserStub } from "../infrastructure/UserStub";

const userRepository = new FakeUserRepository();
let user: User;

beforeAll(async () => {
  user = await userRepository.save(UserStub.create());
});

describe("UserFinder", () => {
  test("should be able to find a user by uuid", async () => {
    const userFinder = new UserFinder(userRepository);
    const foundUser = await userFinder.findByUuid(user.uuid.value);

    expect(foundUser.email.value).toEqual(user.email.value);
    expect(foundUser.uuid.value).toEqual(user.uuid.value);
  });

  test("should be able to find a user by email", async () => {
    const userFinder = new UserFinder(userRepository);
    const foundUser = await userFinder.findByEmail(user.email.value);

    expect(foundUser.email.value).toEqual(user.email.value);
    expect(foundUser.uuid.value).toEqual(user.uuid.value);
  });

  test("should throw an error if the user is not found by uuid", async () => {
    const userFinder = new UserFinder(userRepository);
    userFinder
      .findByUuid("invalid-uuid")
      .catch((error) => expect(error).toBeInstanceOf(NotFoundUserException));
  });

  test("should throw an error if the user is not found by email", async () => {
    const userFinder = new UserFinder(userRepository);
    userFinder
      .findByEmail("invalid-email")
      .catch((error) => expect(error).toBeInstanceOf(NotFoundUserException));
  });
});
