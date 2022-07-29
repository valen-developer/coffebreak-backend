import { ApiProperty } from '@nestjs/swagger';
import { DeepRequired } from 'src/helpers/types/DeepRequired.type';
import { PodcastEpisodeDTO } from '../domain/PodcastEpisode.model';

export class PodcastEpisodeSwaggerModel
  implements DeepRequired<PodcastEpisodeDTO>
{
  @ApiProperty({ type: String, required: true })
  uuid: string;

  @ApiProperty({ type: String, required: true })
  title: string;

  @ApiProperty({ type: String, required: true })
  description: string;

  @ApiProperty({ type: Date, required: true })
  pubDate: string;

  @ApiProperty({ type: Number, required: true })
  duration: number;

  @ApiProperty({ type: String, required: true })
  imageUrl: string;

  @ApiProperty({ type: String, required: true })
  audioUrl: string;

  @ApiProperty({ type: Number, required: true })
  episode: number;
}
