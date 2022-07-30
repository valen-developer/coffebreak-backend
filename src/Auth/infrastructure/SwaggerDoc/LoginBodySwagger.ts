import { ApiProperty } from '@nestjs/swagger';

export class LoginBodySwagger {
  @ApiProperty({ type: 'string', format: 'email' })
  email: string;

  @ApiProperty({ type: 'string', format: 'password' })
  password: string;
}
