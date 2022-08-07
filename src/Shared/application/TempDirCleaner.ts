import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import { enviroment } from 'src/helpers/enviroment';

const logger = new Logger('TempDirCleaner');

@Injectable()
export class TempDirCleaner {
  private _TMP_PATH = enviroment().dirs.temp;

  constructor() {
    this.runCrontab();
  }

  @Cron('0 */10 * * * 5', {
    timeZone: 'Europe/Madrid',
    name: 'TempDirCleaner',
  })
  private runCrontab(): void {
    logger.log('clean tmp dir job started');
    this.clean();
  }

  public clean(): void {
    logger.log('clean tmp dir');

    const exists = fs.existsSync(this._TMP_PATH);
    if (!exists) fs.mkdirSync(this._TMP_PATH);

    const files = fs.readdirSync(this._TMP_PATH);
    files.forEach((file) => {
      fs.unlinkSync(path.join(this._TMP_PATH, file));
    });
  }
}
