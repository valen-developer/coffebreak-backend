import { CronJob } from "../domain/interfaces/Cronjob.interface";

import cron from "node-cron";

export class NodeCronJob implements CronJob {
  private time!: string;
  private callback!: () => void;

  public schedule(time: string, callback: () => void): void {
    this.time = time;
    this.callback = callback;
  }

  public start(): void {
    if (!this.time || !this.callback)
      throw new Error("CronJob not properly configured");

    // timezone: Madrid
    cron
      .schedule(this.time, this.callback, {
        timezone: "Europe/Madrid",
      })
      .start();
    cron.getTasks();
  }
}
