import { ApiProperty } from '@nestjs/swagger';
import { CreateChannelParamsSwagger } from './CreateChannelParamsSwagger';
import { FileBodySwagger } from './FileBodySwagger';

export class CreateChannelBodySwagger
  extends CreateChannelParamsSwagger
  implements FileBodySwagger
{
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: any[];
}
