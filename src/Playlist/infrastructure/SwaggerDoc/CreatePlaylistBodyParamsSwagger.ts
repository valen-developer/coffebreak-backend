import { ApiProperty } from '@nestjs/swagger';
import { DeepRequired } from 'src/helpers/types/DeepRequired.type';
import { Nullable } from 'src/helpers/types/Nullable.type';
import { CreatePlaylistParams } from 'src/Playlist/application/PlaylistCreator';

export class CreatePlaylistParamsSwagger
  implements DeepRequired<Omit<CreatePlaylistParams, 'fileData'>>
{
  @ApiProperty({ type: String, required: true })
  uuid: string;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String, required: true })
  description: string;

  @ApiProperty({ type: String, required: true })
  own: Nullable<string>;
}
