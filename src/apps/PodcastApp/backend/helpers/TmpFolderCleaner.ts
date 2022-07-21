import fs from "fs";
import path from "path";
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
    } catch (error) {
      console.log(error);
    }
  }

  private static removeRecursively(folderPath: string): void {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        TmpFolderCleaner.removeRecursively(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}
