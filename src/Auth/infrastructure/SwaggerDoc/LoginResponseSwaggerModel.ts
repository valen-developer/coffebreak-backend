import { ApiProperty } from '@nestjs/swagger';
import { LoginReponse } from 'src/Auth/application/LoginUser';
import { UserDto } from 'src/User/domain/User.mode';
import { UserWithoutPasswordSwaggerModel } from './UserWithoutPasswordSwaggerModel';

export class LoginResponseSwaggerModel implements LoginReponse {
  @ApiProperty({ type: UserWithoutPasswordSwaggerModel, required: true })
  user: UserWithoutPasswordSwaggerModel;

  @ApiProperty({ type: String, required: true })
  token: string;
}
