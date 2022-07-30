import { ApiProperty } from '@nestjs/swagger';
import { FileBodySwagger } from 'src/Playlist/infrastructure/SwaggerDoc/FileBodySwagger';

export class UpdateUserBodySwagger implements FileBodySwagger {
  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String, required: true })
  email: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: any[];
}
