import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/Auth/infrastructure/JWT.guard';
import { EpisodeTrackSwaggerModel } from 'src/EpisodeTrack/infrastructure/EpisodeTrackSwaggerModel';
import { Union } from 'src/helpers/types/Union.type';
import { User } from 'src/User/domain/User.mode';
import { EpisodeTimeTrackerCreator } from './application/EpisodeTimeTrackerCreator';
import { EpisodeTimeTrackerFinder } from './application/EpisodeTimeTrackerFinder';
import { EpisodeTimeTrackerUpdater } from './application/EpisodeTimeTrackerUpdate';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from './domain/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerSwaggerModel } from './infrastructure/SwaggerEpisodeTimeTracker';

@Controller('episode-time-tracker')
@ApiBearerAuth()
@ApiTags('EpisodeTimeTracker')
export class EpisodeTimeTrackerController {
  constructor(
    private episodeTimeTrackerFinder: EpisodeTimeTrackerFinder,
    private episodeTimeTrackerCreator: EpisodeTimeTrackerCreator,
    private episodeTimeTrackerUpdater: EpisodeTimeTrackerUpdater,
  ) {}

  @Post()
  @UseGuards(JWTGuard)
  @ApiBody({ type: EpisodeTimeTrackerSwaggerModel })
  @ApiResponse({ status: 201 })
  public async create(
    @Body() body: Union<EpisodeTimeTrackerDTO, { session: { user: User } }>,
  ): Promise<void> {
    const { user } = body.session;
    const params = { ...body, userUuid: user.uuid.value };

    await this.episodeTimeTrackerCreator.create(params);
  }

  @Put()
  @UseGuards(JWTGuard)
  @ApiBody({ type: EpisodeTimeTrackerSwaggerModel })
  @ApiResponse({ status: 201 })
  public async update(
    @Body() body: Union<EpisodeTimeTrackerDTO, { session: { user: User } }>,
  ): Promise<void> {
    const { user } = body.session;
    const params = { ...body, userUuid: user.uuid.value };

    await this.episodeTimeTrackerUpdater.update(params);
  }

  @Get('user')
  @UseGuards(JWTGuard)
  @ApiResponse({ status: 200, type: [EpisodeTimeTrackerSwaggerModel] })
  public async getEpisodeTimeTrackerByUser(
    @Body() body: { session: { user: User } },
  ): Promise<EpisodeTimeTrackerDTO[]> {
    const { user } = body.session;

    const timeTrackers = await this.episodeTimeTrackerFinder.findByUser(
      user.uuid?.value,
    );

    return timeTrackers.map((timeTracker) => timeTracker.toDto());
  }
}
