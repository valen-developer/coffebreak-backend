import fs from 'fs';
import path from 'path';
import { enviroment } from 'src/helpers/enviroment';

import { CronJob } from '../domain/interfaces/Cronjob.interface';

export class TempDirCleaner {
  private _TMP_PATH = enviroment().dirs.temp;

  constructor(private cron: CronJob) {
    this.runCrontab();
  }

  private runCrontab(): void {
    this.cron.schedule('10 */10 * * * *', async () => {
      this.clean();
    });
    this.cron.start();
  }

  public clean(): void {
    const files = fs.readdirSync(this._TMP_PATH);
    files.forEach((file) => {
      fs.unlinkSync(path.join(this._TMP_PATH, file));
    });
  }
}
