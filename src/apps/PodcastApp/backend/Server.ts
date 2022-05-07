import express, { json, urlencoded } from "express";
import http from "http";

import helmet from "helmet";

export class Server {
  private express: express.Application;
  private port: number;
  private httpServer!: http.Server;

  constructor(port: number) {
    this.port = port;
    this.express = express();

    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));

    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: "deny" }));
  }

  public getHttpServer(): http.Server {
    return this.httpServer;
  }

  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpServer = this.express.listen(this.port, () => {
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
