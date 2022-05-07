import { enviroment } from "./config/enviroment";
import { Server } from "./Server";

export class PodcastBackendApp {
  public server!: Server;

  public start(): Promise<void> {
    const port = enviroment.port;
    this.server = new Server(Number(port));
    return this.server.start();
  }

  public stop(): Promise<void> {
    return this.server.stop();
  }
}
