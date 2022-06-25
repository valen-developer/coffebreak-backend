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
      new UserCreator(new FakeUserRepository()).create(
        UserStub.create().toDto()
      )
    ).resolves.toBeInstanceOf(User);
  });

  // should throw an error if email is invalid
  test("should throw an error if email is invalid", async () => {
    try {
      await new UserCreator(new FakeUserRepository()).create(
        UserStub.create({ email: "invalid" }).toDto()
      );
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidEmail);
      expect(error.message).toBe(new InvalidEmail().message);
    }
  });

  // should throw an error if password has invalid length
  test("should throw an error if password is invalid", async () => {
    const invalidLongPassword = "inv";

    try {
      await new UserCreator(new FakeUserRepository()).create(
        UserStub.create({ password: invalidLongPassword }).toDto()
      );
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidPasswordException);
      expect(error.message).toBe(
        new InvalidPasswordException(invalidLongPassword).message
      );
    }
  });

  // should throw an error if password has invalid composition
  test("should throw an error if password has invalid composition", async () => {
    const invalidComposedPassword = "invalidinvalid";

    try {
      await new UserCreator(new FakeUserRepository()).create(
        UserStub.create({ password: invalidComposedPassword }).toDto()
      );
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidPasswordException);
      expect(error.message).toBe(
        new InvalidPasswordException(invalidComposedPassword).message
      );
    }
  });

  // should throw an error if role is invalid
  test("should throw an error if role is invalid", async () => {
    try {
      await new UserCreator(new FakeUserRepository()).create(
        UserStub.create({ role: "invalid" as USER_ROLE }).toDto()
      );
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidUserRole);
      expect(error.message).toBe(new InvalidUserRole().message);
    }
  });

  // should throw an error if status is invalid
  test("should throw an error if status is invalid", async () => {
    try {
      await new UserCreator(new FakeUserRepository()).create(
        UserStub.create({ status: "invalid" as USER_STATUS }).toDto()
      );
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidUserStatus);
      expect(error.message).toBe(new InvalidUserStatus().message);
    }
  });
});
