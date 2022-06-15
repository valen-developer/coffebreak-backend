import { Server } from "socket.io";
import http from "http";
import { Events } from "../../../../context/PodcastApp/Shared/domain/constants/Events";

export class IOServer {
  private _io: Server;

  constructor(server: http.Server) {
    this._io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this._io.on("disconnect", (socket) => {
      console.log("disconnect");
      console.log(socket.id);
    });
  }

  public on(event: string, listener: (...args: any[]) => void): void {
    this._io.on(event, listener);
  }

  public emit(event: string, ...args: any[]): void {
    this._io.emit(event, ...args);
  }
}
