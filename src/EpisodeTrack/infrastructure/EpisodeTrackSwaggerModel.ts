import { ApiProperty } from '@nestjs/swagger';
import { DeepRequired } from 'src/helpers/types/DeepRequired.type';
import { EpisodeTrackDto } from '../domain/EpisodeTrack.model';

export class EpisodeTrackSwaggerModel implements DeepRequired<EpisodeTrackDto> {
  @ApiProperty({ type: String, required: true })
  uuid: string;

  @ApiProperty({ type: String, required: true })
  time: string;

  @ApiProperty({ type: String, required: true })
  description: string;

  @ApiProperty({ type: String, required: true })
  episodeUuid: string;
}
