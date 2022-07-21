import fs from "fs";
import path from "path";
import { asyncForeach } from "../../../../helpers/functions/asyncForeach.function";
import { enviroment } from "../config/enviroment";

export class TmpFolderCleaner {
  public static clean(): void {
    try {
      const tmpPath = enviroment.dirs.temp;

      const exist = fs.existsSync(tmpPath);

      if (!exist) {
        // create folder
        fs.mkdirSync(tmpPath);
        return;
      }

      // delete folder recursively
      TmpFolderCleaner.removeRecursively(tmpPath);

      // create folder
      fs.mkdirSync(tmpPath);
    } catch (error) {}
  }

  private static async removeRecursively(folderPath: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const content = fs.readdirSync(folderPath);

      await asyncForeach(content, async (current) => {
        const curPath = path.join(folderPath, current);
        const isDirectory = fs.lstatSync(curPath).isDirectory();

        if (isDirectory) {
          return await TmpFolderCleaner.removeRecursively(curPath);
        }

        return fs.unlinkSync(curPath);
      }).then(() => {
        fs.rmdirSync(folderPath);
        resolve();
      });
    });
  }
}
