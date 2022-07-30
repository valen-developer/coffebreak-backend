import { ApiProperty } from '@nestjs/swagger';
import { DeepRequired } from 'src/helpers/types/DeepRequired.type';
import { TematicPlaylistCreatorParams } from 'src/Playlist/application/PlaylistTematicCreator';

export class CreateChannelParamsSwagger
  implements DeepRequired<Omit<TematicPlaylistCreatorParams, 'fileData'>>
{
  @ApiProperty({ type: String, required: true })
  tematic: string;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String, required: true })
  description: string;
}
