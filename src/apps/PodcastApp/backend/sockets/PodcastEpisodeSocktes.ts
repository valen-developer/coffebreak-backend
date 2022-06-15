import { Playlist } from "../../../../context/PodcastApp/Playlist/domain/Playlist.model";
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from "../../../../context/PodcastApp/Podcast/domain/PodcastEpisode.model";
import { Events } from "../../../../context/PodcastApp/Shared/domain/constants/Events";
import { EventEmitter } from "../../../../context/PodcastApp/Shared/domain/interfaces/EventEmitter";
import { IOServer } from "./IOSocket";

export class PodcastEpisodeSockets {
  private _clients: any[] = [];

  constructor(private io: IOServer, private eventEmitter: EventEmitter) {
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {
    this.io.on(Events.CONNECTION, (client: any) => this.onConnection(client));

    this.eventEmitter.on<PodcastEpisode>(Events.NEW_EPISODE, (e) =>
      this.onNewEpisode(e)
    );

    this.eventEmitter.on<Playlist>(Events.NEW_CHANNEL, (e) =>
      this.onNewChannel(e)
    );
  }

  private onNewEpisode(episode: PodcastEpisode): void {
    this._clients.forEach((client) => {
      client.emit(Events.NEW_EPISODE, episode.toDTO());
    });
  }

  private onNewChannel(channel: Playlist): void {
    this._clients.forEach((client) => {
      client.emit(Events.NEW_CHANNEL, channel.toDTO());
    });
  }

  private onConnection(client: any): void {
    console.log("connect");
    this._clients.push(client);

    client.on(Events.DISCONNECT, () => {
      this.onDisconnect(client);
    });
  }

  private onDisconnect(client: any): void {
    console.log("Desconectado");
    this._clients = this._clients.filter((c) => c.id !== client.id);
  }
}
