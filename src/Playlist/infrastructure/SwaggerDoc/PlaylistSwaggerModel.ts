import { ApiProperty } from '@nestjs/swagger';
import { DeepRequired } from 'src/helpers/types/DeepRequired.type';
import { PlaylistDTO } from 'src/Playlist/domain/Playlist.model';

export class PlaylistSwaggerModel implements DeepRequired<PlaylistDTO> {
  @ApiProperty({ type: String, required: true })
  uuid: string;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String, required: true })
  description: string;

  @ApiProperty({ type: String, required: true })
  own: string | null;

  @ApiProperty({ type: String, required: true })
  episodes: string[];
}
