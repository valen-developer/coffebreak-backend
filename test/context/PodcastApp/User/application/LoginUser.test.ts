/**
 * should be able to login with valid credentials
 * should not be able to login with invalid credentials
 * should not be able to login  with inactive user
 * should not be able to login  if not found user
 * should receive a userDto without password and token when login
 */

import { EventEmitter } from "../../../../../src/context/PodcastApp/Shared/domain/interfaces/EventEmitter";
import { BCrypt } from "../../../../../src/context/PodcastApp/Shared/infrastructure/BCrypt";
import { Fakerjs } from "../../../../../src/context/PodcastApp/Shared/infrastructure/Fakerjs";
import { JsonWebTokenJWT } from "../../../../../src/context/PodcastApp/Shared/infrastructure/JsonWebTokenJWT";
import { NativeEventEmitter } from "../../../../../src/context/PodcastApp/Shared/infrastructure/NativeEventEmitter";
import { LoginUser } from "../../../../../src/context/PodcastApp/User/application/LoginUser";
import { SignupUser } from "../../../../../src/context/PodcastApp/User/application/SingupUser";
import { UserCreator } from "../../../../../src/context/PodcastApp/User/application/UserCreator";
import { UserFinder } from "../../../../../src/context/PodcastApp/User/application/UserFinder";
import { InvalidPasswordException } from "../../../../../src/context/PodcastApp/User/domain/exceptions/InvalidPassword.exception";
import { NotActiveUserException } from "../../../../../src/context/PodcastApp/User/domain/exceptions/NotActiveUser.exception";
import { NotFoundUserException } from "../../../../../src/context/PodcastApp/User/domain/exceptions/NotUserFound.exception";
import { User } from "../../../../../src/context/PodcastApp/User/domain/User.mode";
import { FakeUserRepository } from "../infrastructure/FakeUserRepository";
import { UserStub } from "../infrastructure/UserStub";

const userRepository = new FakeUserRepository();
let userStubbed: User;
let password: string;

beforeAll(async () => {
  password = new Fakerjs().password();
  userStubbed = await new SignupUser(
    new UserCreator(userRepository),
    new BCrypt(),
    new NativeEventEmitter()
  ).signup(UserStub.signupDto({ password, passwordConfirmation: password }));
  userStubbed.activate();
  userRepository.update(userStubbed);
});

beforeEach(async () => {
  userStubbed.activate();
  await userRepository.update(userStubbed);
});

describe("LoginUser", () => {
  test("should be able to login with valid credentials", async () => {
    await expect(
      new LoginUser(
        new UserFinder(userRepository),
        new BCrypt(),
        new JsonWebTokenJWT()
      ).login(userStubbed.email.value, password)
    ).resolves.not.toThrow();
  });

  test("should not be able to login with invalid credentials", async () => {
    await expect(
      new LoginUser(
        new UserFinder(userRepository),
        new BCrypt(),
        new JsonWebTokenJWT()
      ).login(userStubbed.email.value, "Invalid password1")
    ).rejects.toThrow(InvalidPasswordException);
  });

  test("should not be able to login with inactive user", async () => {
    userStubbed.deactivate();
    await userRepository.update(userStubbed);

    await expect(
      new LoginUser(
        new UserFinder(userRepository),
        new BCrypt(),
        new JsonWebTokenJWT()
      ).login(userStubbed.email.value, password)
    ).rejects.toThrow(NotActiveUserException);
  });

  test("should not be able to login if not found user", async () => {
    const loggerIn = new LoginUser(
      new UserFinder(userRepository),
      new BCrypt(),
      new JsonWebTokenJWT()
    );

    return loggerIn.login(new Fakerjs().email(), password).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundUserException);
    });
  });

  test("should receive a user and token when login", async () => {
    const loggerIn = new LoginUser(
      new UserFinder(userRepository),
      new BCrypt(),
      new JsonWebTokenJWT()
    );

    const { user, token } = await loggerIn.login(
      userStubbed.email.value,
      password
    );

    expect(user).toBeDefined();
    expect(user.email).toBe(userStubbed.email.value);
    expect((user as any).password).toBeUndefined();
    expect(token).toBeDefined();
  });
});
