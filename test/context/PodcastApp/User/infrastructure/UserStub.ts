import { Faker } from "../../../../../src/context/PodcastApp/Shared/domain/interfaces/Faker.interface";
import { Fakerjs } from "../../../../../src/context/PodcastApp/Shared/infrastructure/Fakerjs";
import { SingupRequest } from "../../../../../src/context/PodcastApp/User/application/SingupUser";
import {
  User,
  UserDto,
} from "../../../../../src/context/PodcastApp/User/domain/User.mode";
import { DeepOptional } from "../../../../../src/helpers/types/DeepOptional";

export class UserStub {
  private static faker: Faker = new Fakerjs();

  constructor() {}

  public static create(dto?: DeepOptional<UserDto>): User {
    const fixedDto: UserDto = {
      uuid: UserStub.faker.uuid(),
      name: dto?.name ?? UserStub.faker.name(),
      email: dto?.email ?? UserStub.faker.email(),
      password: dto?.password ?? UserStub.faker.password(),
      role: dto?.role ?? UserStub.faker.userRole(),
      status: dto?.status ?? UserStub.faker.userStatus(),
    };

    return new User(fixedDto);
  }

  public static createDto(dto?: DeepOptional<UserDto>): UserDto {
    return {
      uuid: UserStub.faker.uuid(),
      name: dto?.name ?? UserStub.faker.name(),
      email: dto?.email ?? UserStub.faker.email(),
      password: dto?.password ?? UserStub.faker.password(),
      role: dto?.role ?? UserStub.faker.userRole(),
      status: dto?.status ?? UserStub.faker.userStatus(),
    };
  }

  public static signupDto(dto?: DeepOptional<SingupRequest>): SingupRequest {
    const fakePassword = UserStub.faker.password();

    return {
      uuid: dto?.uuid ?? UserStub.faker.uuid(),
      name: dto?.name ?? UserStub.faker.name(),
      email: dto?.email ?? UserStub.faker.email(),
      password: dto?.password ?? fakePassword,
      passwordConfirmation: dto?.passwordConfirmation ?? fakePassword,
    };
  }
}
