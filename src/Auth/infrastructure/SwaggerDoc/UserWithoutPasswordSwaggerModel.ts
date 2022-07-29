import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/User/domain/User.mode';
import { USER_ROLE } from 'src/User/domain/valueObject/UserRole.valueObject';
import { USER_STATUS } from 'src/User/domain/valueObject/UserStatus.valueObject';

export class UserWithoutPasswordSwaggerModel
  implements Omit<UserDto, 'password'>
{
  @ApiProperty({ type: String, required: true })
  uuid: string;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String, required: true })
  email: string;

  @ApiProperty({ type: String, required: true, enum: USER_ROLE })
  role: USER_ROLE;

  @ApiProperty({ type: String, required: true, enum: USER_STATUS })
  status: USER_STATUS;
}
