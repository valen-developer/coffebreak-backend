import { ApiProperty } from '@nestjs/swagger';
import { CreatePlaylistParamsSwagger } from './CreatePlaylistBodyParamsSwagger';
import { FileBodySwagger } from './FileBodySwagger';

export class CreatePlaylistBodySwagger
  extends CreatePlaylistParamsSwagger
  implements FileBodySwagger
{
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: any[];
}
