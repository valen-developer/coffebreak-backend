import { PodcastExtractorCrontab } from "../../../context/PodcastApp/Podcast/application/PodcastExtractorCrontab";
import { enviroment } from "./config/enviroment";
import { Container } from "./dependency-injection/Container";
import { injectAll } from "./dependency-injection/injectAll";
import { PodcastEpisodeDependencies } from "./dependency-injection/injectPodcastEpisodiesDependencies";
import { connectMongo } from "./helpers/connectMongo";
import { Server } from "./Server";
import { PassportGoogleStategy } from "../../Shared/config/PassportGoogle";
import { ArtistExtractoCrontab } from "../../../context/PodcastApp/Artist/application/ArtistExtractorCrontab";
import { ArtistDependencies } from "./dependency-injection/injectArtistDependencies";

export class PodcastBackendApp {
  public server!: Server;

  public async start(): Promise<void> {
    const port = enviroment.port;
    this.server = new Server(Number(port));

    await this.upDB();
    this.injectDependencies();
    this.initCronJobs();
    this.initPassport();

    return this.server.start();
  }

  public stop(): Promise<void> {
    return this.server.stop();
  }

  private async upDB(): Promise<void> {
    await connectMongo();
  }

  private initPassport(): void {
    new PassportGoogleStategy().configurePassport();
  }

  private injectDependencies(): void {
    injectAll();
  }

  private initCronJobs(): void {
    const container = Container.getInstance();

    const podcastExtractorJob = container.get<PodcastExtractorCrontab>(
      PodcastEpisodeDependencies.PodcastExtractorCronTab
    );

    const artistExtractorJob = container.get<ArtistExtractoCrontab>(
      ArtistDependencies.ArtistExtractorCrontab
    );

    podcastExtractorJob.run();
    artistExtractorJob.run();
  }
}
