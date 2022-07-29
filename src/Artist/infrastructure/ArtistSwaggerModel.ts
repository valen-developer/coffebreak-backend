import { ApiProperty } from '@nestjs/swagger';
import { DeepRequired } from 'src/helpers/types/DeepRequired.type';
import { ArtistDTO } from '../domain/Artist.model';

export class ArtistSwaggerModel implements DeepRequired<ArtistDTO> {
  @ApiProperty({ type: String, required: true })
  uuid: string;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String })
  episodes: number[];
}
