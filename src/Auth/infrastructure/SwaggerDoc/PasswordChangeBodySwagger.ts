import { ApiProperty } from '@nestjs/swagger';

import { PasswordRecoverBodySwagger } from './PasswordRecoverBodySwagger';

export class PasswordChangeBodySwagger
  implements Omit<PasswordRecoverBodySwagger, 'email'>
{
  @ApiProperty({ type: String, required: true })
  password: string;

  @ApiProperty({ type: String, required: true })
  passwordConfirmation: string;
}
