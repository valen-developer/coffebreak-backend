import { CronJob } from "../../Shared/domain/interfaces/Cronjob.interface";
import { ArtistExtractor } from "../domain/interfaces/ArtistExtractor.interface";

export class ArtistExtractoCrontab {
  constructor(
    private cron: CronJob,
    private artistExtractor: ArtistExtractor
  ) {}

  public run(): Promise<void> {
    this.extract();
    this.cron.schedule("10 */2 * * * 5", async () => {
      await this.extract();
    });

    this.cron.start();

    return Promise.resolve();
  }

  public async extract(): Promise<void> {
    console.log("extracting artists");
    const artists = await this.artistExtractor.extract();
  }
}
