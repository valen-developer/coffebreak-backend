import { IvooxPodcastExtractor } from "../../../context/PodcastApp/Podcast/infrastructure/IvooxPodcastExtractor";
import { NodeFetchHttpClient } from "../../../context/PodcastApp/Shared/infrastructure/NodeFetchHttpClient";
import { PodcastBackendApp } from "./PodcastBackendApp";

try {
  new PodcastBackendApp().start();

  const httpClient = new NodeFetchHttpClient();

  const podcastExtractor = new IvooxPodcastExtractor();

  podcastExtractor.extract(httpClient);
} catch (error) {
  console.log(error);
  process.exit(1);
}

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});
