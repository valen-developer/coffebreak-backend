import { Injectable } from '@nestjs/common';
import * as formidable from 'formidable';
import * as fs from 'fs';

import { enviroment } from 'src/helpers/enviroment';
import { cleanArray } from 'src/helpers/functions/cleanArray.function';

import {
  FormDataParser,
  FormDataResponse,
} from '../domain/interfaces/FormDataParser.interface';

@Injectable()
export class FormidableFormDataParser implements FormDataParser {
  public parse<T>(req: any): Promise<FormDataResponse<T>> {
    return new Promise((resolve, reject) => {
      const form = formidable({
        uploadDir: this.getTempDirPath(),
        encoding: 'utf-8',
        multiples: true,
      });

      form.parse(req, (err, fields, files: any) => {
        if (err) reject(err);

        const filesFixed = [files.file].flat();

        const filesData = cleanArray(
          filesFixed.map((file: any) => {
            if (!file) return null;

            return {
              orginalName: file.originalFilename,
              mimeType: file.mimetype,
              size: file.size,
              path: file.filepath,
            };
          }),
        );

        resolve({
          fields: fields as any,
          files: filesData,
        });
      });
    });
  }

  private getTempDirPath(): string {
    const tempPath = enviroment().dirs.temp;

    // check if exists or create
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath);
    }

    return tempPath;
  }
}
