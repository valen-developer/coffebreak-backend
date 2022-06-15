import express, { json, urlencoded } from "express";
import cors from "cors";
import http from "http";

import helmet from "helmet";

import { router } from "./routes";
import { IOServer } from "./sockets/IOSocket";

export class Server {
  private express: express.Application;
  private port: number;
  private httpServer!: http.Server;
  private _ioServer: IOServer;

  constructor(port: number) {
    this.port = port;
    this.express = express();
    this.httpServer = http.createServer(this.express);
    this._ioServer = new IOServer(this.httpServer);

    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));

    this.express.use(
      cors(
        // Allow all origins
        {
          origin: "*",
          // Allow all methods
          methods: "*",
          // Allow all headers
          allowedHeaders: "*",
          // Allow credentials (cookies, authorization, etc.)
          credentials: true,
          // Allow all exposed headers
          exposedHeaders: "*",
        }
      )
    );

    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: "deny" }));

    this.express.use("/api", router);
  }

  public getHttpServer(): http.Server {
    return this.httpServer;
  }

  public getIOServer(): IOServer {
    return this._ioServer;
  }

  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpServer.listen(this.port, () => {
        console.log(`Server started on port ${this.port}`);
        resolve();
      });
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) return resolve();

      this.httpServer.close((error) => {
        if (error) return reject();
        console.log(`Server stopped on port ${this.port}`);
        resolve();
      });
    });
  }
}
