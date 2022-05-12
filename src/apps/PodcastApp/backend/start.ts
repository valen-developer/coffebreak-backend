import { PodcastBackendApp } from "./PodcastBackendApp";

try {
  new PodcastBackendApp().start();
} catch (error) {
  console.log(error);
  process.exit(1);
}

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});
