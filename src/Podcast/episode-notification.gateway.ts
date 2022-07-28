import { Injectable } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Server, Socket } from 'socket.io';
import { Playlist } from 'src/Playlist/domain/Playlist.model';
import { Events } from 'src/Shared/domain/constants/Events';
import { EventEmitter } from 'src/Shared/domain/interfaces/EventEmitter';
import { PodcastEpisode } from './domain/PodcastEpisode.model';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EpisodeNotificationGateway implements NestGateway {
  private server: Server;

  constructor(private eventEmitter: EventEmitter) {}

  public afterInit(server: Server) {
    this.server = server;
  }

  public handleConnection(client: Socket) {
    console.log('Connection');

    this.eventEmitter.on(Events.NEW_EPISODE, (episode: PodcastEpisode) => {
      this.handleNewEpisode(episode, client);
    });

    this.eventEmitter.on(Events.NEW_CHANNEL, (channel: Playlist) => {
      client.emit(Events.NEW_CHANNEL, channel.toDTO());
    });
  }

  public handleDisconnect(client: any) {}

  public handleNewEpisode(episode: PodcastEpisode, client: Socket): void {
    if (!client.connected) return;
    this.server.emit(Events.NEW_EPISODE, episode.toDTO());
  }
}
