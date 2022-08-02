import { Injectable, Logger } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Server, Socket } from 'socket.io';
import { Playlist } from 'src/Playlist/domain/Playlist.model';
import { Events } from 'src/Shared/domain/constants/Events';
import { EventEmitter } from 'src/Shared/domain/interfaces/EventEmitter';
import { PodcastEpisode } from './domain/PodcastEpisode.model';

const logger = new Logger('PodcastEpisodeNotificationGateway');

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EpisodeNotificationGateway implements NestGateway {
  private server: Server;
  private count: number = 0;

  constructor(private eventEmitter: EventEmitter) {}

  public afterInit(server: Server) {
    this.server = server;

    this.eventEmitter.on(Events.NEW_EPISODE, (episode: PodcastEpisode) => {
      this.handleNewEpisode(episode);
    });

    this.eventEmitter.on(Events.NEW_CHANNEL, (channel: Playlist) => {
      this.handleNewChannel(channel);
    });
  }

  public handleConnection(client: Socket) {
    this.count++;
    logger.log(`Client connected: ${client.id}`);
    logger.log(`Total clients: ${this.count}`);
  }

  public handleDisconnect(client: any) {
    this.count--;
    logger.log(`Client disconnected: ${client.id}`);
    logger.log(`Total clients: ${this.count}`);
  }

  public handleNewEpisode(episode: PodcastEpisode): void {
    this.server?.emit(Events.NEW_EPISODE, episode.toDTO());
  }

  public handleNewChannel(channel: Playlist): void {
    this.server?.emit(Events.NEW_CHANNEL, channel.toDTO());
  }
}
