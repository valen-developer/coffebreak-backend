import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { enviroment } from 'src/helpers/enviroment';

import { CronJob } from '../domain/interfaces/Cronjob.interface';

const logger = new Logger('TempDirCleaner');

@Injectable()
export class TempDirCleaner {
  private _TMP_PATH = enviroment().dirs.temp;

  constructor(private cron: CronJob) {
    this.runCrontab();
  }

  private runCrontab(): void {
    logger.log('clean tmp dir job started');
    this.clean();
    this.cron.schedule('10 */10 * * * *', async () => {
      this.clean();
    });
    this.cron.start();
  }

  public clean(): void {
    logger.log('clean tmp dir');
    const files = fs.readdirSync(this._TMP_PATH);
    files.forEach((file) => {
      fs.unlinkSync(path.join(this._TMP_PATH, file));
    });
  }
}
