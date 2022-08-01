import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { enviroment as enviromentFn } from 'src/helpers/enviroment';

import { InvalidImageExtension } from '../../Image/domain/exceptions/InvalidImageExtension.exception';
import { NullException } from '../domain/exceptions/Null.exception';

import { FileUploader } from '../domain/interfaces/FileUploader';
import { FileData } from '../domain/interfaces/FormDataParser.interface';

const enviroment = enviromentFn();

@Injectable()
export class FsFileUploader implements FileUploader {
  private _IMAGE_PATH = enviroment.dirs.images;
  private _TMP_PATH = enviroment.dirs.temp;

  private _ALLOED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

  constructor() {
    this.createImageFolder();
  }

  public async uploadImage(file: FileData): Promise<string> {
    if (!file?.size) throw new NullException('image');

    const fileExt = this.ext(file.mimeType);

    if (!this.isAllowedExt(fileExt)) throw new InvalidImageExtension(fileExt);

    const filePath = path.join(this._IMAGE_PATH, `${file.name}.${fileExt}`);
    fs.copyFileSync(file.path, filePath);
    fs.unlinkSync(file.path);

    return filePath;
  }

  private ext(mimeType: string): string {
    return mimeType.split('/')[1];
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
    newName: string,
  ): Promise<string> {
    const splitted = filePath.split('/');
    const imageName = splitted[splitted.length - 1];
    const imageNameWithoutExt = imageName.split('.')[0];
    const ext = imageName.split('.')[1];
    const tempImageName = `${imageNameWithoutExt}_${newName}.${ext}`;

    // copy from filePath
    const tempPath = path.join(this._TMP_PATH, tempImageName);
    fs.copyFileSync(filePath, tempPath);

    const fileData: FileData = {
      mimeType: `image/${ext}`,
      orginalName: tempImageName,
      path: tempPath,
      size: fs.statSync(tempPath).size,
      name: newName,
    };

    return await this.uploadImage(fileData);
  }
}
