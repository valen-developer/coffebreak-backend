import fs from "fs";
import path from "path";
import { enviroment } from "../../../../apps/PodcastApp/backend/config/enviroment";
import { InvalidImageExtension } from "../../Image/domain/exceptions/InvalidImageExtension.exception";
import { NullException } from "../domain/exceptions/Null.exception";

import { FileUploader } from "../domain/interfaces/FileUploader";
import { FileData } from "../domain/interfaces/FormDataParser.interface";

export class FsFileUploader implements FileUploader {
  private _IMAGE_PATH = enviroment.dirs.images;
  private _TMP_PATH = enviroment.dirs.temp;

  private _ALLOED_EXTENSIONS = ["jpg", "jpeg", "png"];

  constructor() {
    this.createImageFolder();
  }

  public async uploadImage(file: FileData): Promise<string> {
    if (!file.name) throw new NullException("file name");

    const fileExt = this.ext(file.mimeType);

    if (!this.isAllowedExt(fileExt)) throw new InvalidImageExtension(fileExt);

    const filePath = path.join(this._IMAGE_PATH, `${file.name}.${fileExt}`);
    fs.renameSync(file.path, filePath);

    return filePath;
  }

  private ext(mimeType: string): string {
    return mimeType.split("/")[1];
  }

  private isAllowedExt(ext: string): boolean {
    return this._ALLOED_EXTENSIONS.includes(ext);
  }

  private createImageFolder(): void {
    if (!fs.existsSync(this._IMAGE_PATH)) {
      fs.mkdirSync(this._IMAGE_PATH);
    }
  }

  public async deleteImage(filePath: string): Promise<void> {
    fs.unlinkSync(filePath);
  }

  public async duplicateImage(
    filePath: string,
    newName: string
  ): Promise<string> {
    // TODO: implement
    return "";
  }
}
