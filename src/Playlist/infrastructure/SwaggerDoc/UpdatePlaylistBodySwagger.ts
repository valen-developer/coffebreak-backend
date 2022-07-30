import { ApiProperty } from '@nestjs/swagger';

import { FileBodySwagger } from './FileBodySwagger';
import { PlaylistSwaggerModel } from './PlaylistSwaggerModel';

export class UpdatePlaylistBodySwagger
  extends PlaylistSwaggerModel
  implements FileBodySwagger
{
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: any[];
}
