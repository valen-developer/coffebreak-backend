import { UserCreator } from "../../../../../src/context/PodcastApp/User/application/UserCreator";
import { InvalidEmail } from "../../../../../src/context/PodcastApp/User/domain/exceptions/InvalidEmail.exception";
import { InvalidPasswordException } from "../../../../../src/context/PodcastApp/User/domain/exceptions/InvalidPassword.exception";
import { InvalidUserRole } from "../../../../../src/context/PodcastApp/User/domain/exceptions/InvalidUserRole.exception";
import { InvalidUserStatus } from "../../../../../src/context/PodcastApp/User/domain/exceptions/InvalidUserStatues.exception";
import { User } from "../../../../../src/context/PodcastApp/User/domain/User.mode";
import { USER_ROLE } from "../../../../../src/context/PodcastApp/User/domain/valueObject/UserRole.valueObject";
import { USER_STATUS } from "../../../../../src/context/PodcastApp/User/domain/valueObject/UserStatus.valueObject";
import { FakeUserRepository } from "../infrastructure/FakeUserRepository";
import { UserStub } from "../infrastructure/UserStub";

describe("UserCreator", () => {
  // should be able to create a new user
  test("should be able to create a new user", async () => {
    await expect(
      new UserCreator(new FakeUserRepository()).create(UserStub.createDto())
    ).resolves.toBeInstanceOf(User);
  });

  // should throw an error if email is invalid
  test("should throw an error if email is invalid", async () => {
    await new UserCreator(new FakeUserRepository())
      .create(UserStub.createDto({ email: "invalid" }))
      .catch((error) => {
        expect(error).toBeInstanceOf(InvalidEmail);
        expect(error.message).toBe(new InvalidEmail().message);
      });
  });

  // should throw an error if password has invalid length
  test("should throw an error if password is invalid", async () => {
    const invalidLongPassword = "inv";

    await new UserCreator(new FakeUserRepository())
      .create(UserStub.createDto({ password: invalidLongPassword }))
      .catch((error) => {
        expect(error).toBeInstanceOf(InvalidPasswordException);
        expect(error.message).toBe(
          new InvalidPasswordException(invalidLongPassword).message
        );
      });
  });

  // should throw an error if password has invalid composition
  test("should throw an error if password has invalid composition", async () => {
    const invalidComposedPassword = "invalidinvalid";

    await new UserCreator(new FakeUserRepository())
      .create(UserStub.createDto({ password: invalidComposedPassword }))
      .catch((error) => {
        expect(error).toBeInstanceOf(InvalidPasswordException);
        expect(error.message).toBe(
          new InvalidPasswordException(invalidComposedPassword).message
        );
      });
  });

  // should throw an error if role is invalid
  test("should throw an error if role is invalid", async () => {
    await new UserCreator(new FakeUserRepository())
      .create(UserStub.createDto({ role: "invalid" as USER_ROLE }))
      .catch((error) => {
        expect(error).toBeInstanceOf(InvalidUserRole);
        expect(error.message).toBe(new InvalidUserRole().message);
      });
  });

  // should throw an error if status is invalid
  test("should throw an error if status is invalid", async () => {
    await new UserCreator(new FakeUserRepository())
      .create(UserStub.createDto({ status: "invalid" as USER_STATUS }))
      .catch((error) => {
        expect(error).toBeInstanceOf(InvalidUserStatus);
        expect(error.message).toBe(new InvalidUserStatus().message);
      });
  });
});
