/*
* Should create a user
* Password and password confirmation should be the same
* User should be inactive

*/

import { BCrypt } from "../../../../../src/context/PodcastApp/Shared/infrastructure/BCrypt";
import { SignupUser } from "../../../../../src/context/PodcastApp/User/application/SingupUser";
import { UserCreator } from "../../../../../src/context/PodcastApp/User/application/UserCreator";
import { InvalidPasswordConfirmationException } from "../../../../../src/context/PodcastApp/User/domain/exceptions/InvalidPasswordConfirmation.exception";
import { User } from "../../../../../src/context/PodcastApp/User/domain/User.mode";
import { USER_STATUS } from "../../../../../src/context/PodcastApp/User/domain/valueObject/UserStatus.valueObject";
import { FakeUserRepository } from "../infrastructure/FakeUserRepository";
import { UserStub } from "../infrastructure/UserStub";

describe("SignupUser", () => {
  test(" Should create a user ", async () => {
    await expect(
      new SignupUser(
        new UserCreator(new FakeUserRepository()),
        new BCrypt()
      ).signup(UserStub.signupDto())
    ).resolves.toBeInstanceOf(User);
  });

  test(" Password and password confirmation should be the same ", async () => {
    const signupper = new SignupUser(
      new UserCreator(new FakeUserRepository()),
      new BCrypt()
    );

    await expect(
      signupper.signup(
        UserStub.signupDto({ passwordConfirmation: "different" })
      )
    ).rejects.toThrow(new InvalidPasswordConfirmationException());
  });

  test(" User should be inactive ", async () => {
    const signupper = new SignupUser(
      new UserCreator(new FakeUserRepository()),
      new BCrypt()
    );

    const user = await signupper.signup(UserStub.signupDto());

    expect(user.status.isActive()).toBe(false);
    expect(user.status.value).toBe(USER_STATUS.INACTIVE);
  });
});
