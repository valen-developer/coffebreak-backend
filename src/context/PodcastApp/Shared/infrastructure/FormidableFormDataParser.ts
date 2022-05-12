import formidable from "formidable";
import fs from "fs";
import path from "path";
import { enviroment } from "../../../../apps/PodcastApp/backend/config/enviroment";

import { cleanArray } from "../../../../helpers/functions/cleanArray.function";

import {
  FormDataParser,
  FormDataResponse,
} from "../domain/interfaces/FormDataParser.interface";

export class FormidableFormDataParser implements FormDataParser {
  public parse<T>(req: any): Promise<FormDataResponse<T>> {
    return new Promise((resolve, reject) => {
      const form = formidable({
        uploadDir: this.getTempDirPath(),
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
          })
        );

        resolve({
          fields: fields as any,
          files: filesData,
        });
      });
    });
  }

  private getTempDirPath(): string {
    const tempPath = enviroment.dirs.temp;

    // check if exists or create
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath);
    }

    return tempPath;
  }
}
