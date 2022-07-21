import { CronJob } from "../../../../context/PodcastApp/Shared/domain/interfaces/Cronjob.interface";
import { TmpFolderCleaner } from "./TmpFolderCleaner";

export class TmpFolderCleanerCronjob {
  constructor(private cron: CronJob) {}

  public run(): void {
    this.cron.schedule("0 0 1 * * *", () => {
      this.cleanFolder();
    });
    this.cleanFolder();
  }

  public cleanFolder(): void {
    TmpFolderCleaner.clean();
  }
}
