import { ApiProperty } from '@nestjs/swagger';
import { DeepRequired } from 'src/helpers/types/DeepRequired.type';
import { EpisodeTimeTrackerDTO } from '../domain/EpisodeTimeTracker.model';

export class EpisodeTimeTrackerSwaggerModel
  implements DeepRequired<EpisodeTimeTrackerDTO>
{
  @ApiProperty({ type: String, required: true })
  uuid: string;

  @ApiProperty({ type: String, required: true })
  episodeUuid: string;

  @ApiProperty({ type: String, required: true })
  userUuid: string;

  @ApiProperty({ type: Number, required: true })
  time: number;
}
