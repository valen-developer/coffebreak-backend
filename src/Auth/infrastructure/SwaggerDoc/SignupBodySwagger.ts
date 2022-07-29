import { ApiProperty } from '@nestjs/swagger';
import { SingupRequest } from 'src/Auth/application/SingupUser';
import { DeepRequired } from 'src/helpers/types/DeepRequired.type';

export class SignupBodySwagger implements DeepRequired<SingupRequest> {
  @ApiProperty({ type: String, required: true })
  uuid: string;

  @ApiProperty({ type: String, required: true })
  email: string;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String, required: true })
  password: string;

  @ApiProperty({ type: String, required: true })
  passwordConfirmation: string;
}
