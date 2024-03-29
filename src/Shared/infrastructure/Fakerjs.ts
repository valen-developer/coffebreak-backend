import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { InvalidPasswordException } from '../../User/domain/exceptions/InvalidPassword.exception';
import { USER_ROLE } from '../../User/domain/valueObject/UserRole.valueObject';
import { USER_STATUS } from '../../User/domain/valueObject/UserStatus.valueObject';

import { Faker } from '../domain/interfaces/Faker.interface';

@Injectable()
export class Fakerjs implements Faker {
  userStatus(): USER_STATUS {
    const statuses: USER_STATUS[] = [USER_STATUS.ACTIVE, USER_STATUS.INACTIVE];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  userRole(): USER_ROLE {
    const roles: USER_ROLE[] = [USER_ROLE.ADMIN, USER_ROLE.USER];
    return roles[Math.floor(Math.random() * roles.length)];
  }

  password(): string {
    const regex = InvalidPasswordException.regEx;
    return faker.internet.password(15, false, /\w/, 'A1');
  }

  name(): string {
    return faker.name.findName();
  }

  uuid(): string {
    return faker.datatype.uuid();
  }

  email(): string {
    return faker.internet.email();
  }

  paragraph(max: number): string {
    return faker.lorem.paragraph(max);
  }
}
