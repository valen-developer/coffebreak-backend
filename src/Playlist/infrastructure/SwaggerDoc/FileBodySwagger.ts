import { ApiProperty } from '@nestjs/swagger';

export class FileBodySwagger {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: any[];
}
