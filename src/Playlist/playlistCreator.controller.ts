import { Controller, Param, Post, Req } from '@nestjs/common';
import { FormDataParser } from 'src/Shared/domain/interfaces/FormDataParser.interface';
import {
  CreatePlaylistParams,
  PlaylistCreator,
} from './application/PlaylistCreator';
import { PlaylistDuplicator } from './application/PlaylistDuplicator';
import {
  PlaylistTematicCreator,
  TematicPlaylistCreatorParams,
} from './application/PlaylistTematicCreator';
import { PlaylistDTO } from './domain/Playlist.model';

@Controller('playlist')
export class PlaylistCreatorController {
  constructor(
    private formDataParser: FormDataParser,
    private playlistCreator: PlaylistCreator,
    private playlistDuplicator: PlaylistDuplicator,
    private tematicPlaylistCreator: PlaylistTematicCreator,
  ) {}

  @Post()
  public async createPlaylist(@Req() request: any): Promise<void> {
    const { fields, files } =
      await this.formDataParser.parse<CreatePlaylistParams>(request);

    await this.playlistCreator.create({
      ...fields,
      fileData: files[0],
    });
  }

  @Post('tematic')
  public async createTematicPlaylist(@Req() request: any): Promise<void> {
    const { fields, files } =
      await this.formDataParser.parse<TematicPlaylistCreatorParams>(request);

    await this.tematicPlaylistCreator.create({
      ...fields,
      fileData: files[0],
    });
  }

  @Post('duplicate/:uuid')
  public async duplicatePlaylist(
    @Param('uuid') uuid: string,
    @Req() req: any,
  ): Promise<PlaylistDTO> {
    const { session } = req.body;
    const { user } = session;

    const playlist = await this.playlistDuplicator.duplicate(
      uuid,
      user.uuid.value,
    );
    return playlist.toDTO();
  }
}
