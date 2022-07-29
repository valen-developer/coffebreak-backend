import { ApiProperty } from '@nestjs/swagger';
import { PasswordRecoverParams } from 'src/Auth/application/PasswordRecover';
import { DeepRequired } from 'src/helpers/types/DeepRequired.type';

export class PasswordRecoverBodySwagger
  implements DeepRequired<PasswordRecoverParams>
{
  @ApiProperty({ type: String, required: true })
  email: string;

  @ApiProperty({ type: String, required: true })
  password: string;

  @ApiProperty({ type: String, required: true })
  passwordConfirmation: string;
}
