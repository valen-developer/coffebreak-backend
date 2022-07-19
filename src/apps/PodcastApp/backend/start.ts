import { loadEnv } from "../../../helpers/loadEnv";
loadEnv();

import { EventEmitter } from "../../../context/PodcastApp/Shared/domain/interfaces/EventEmitter";
import { Container } from "./dependency-injection/Container";
import { UtilDependencies } from "./dependency-injection/injectUtils";
import { PodcastBackendApp } from "./PodcastBackendApp";
import { PodcastEpisodeSockets } from "./sockets/PodcastEpisodeSocktes";

const startApp = async () => {
  try {
    const server = new PodcastBackendApp();
    await server.start();

    new PodcastEpisodeSockets(
      server.server.getIOServer(),
      Container.getInstance().get<EventEmitter>(UtilDependencies.EventEmitter)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startApp().catch((erro) => {
  console.log(erro);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});
