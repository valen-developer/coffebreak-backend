import fs from 'fs';
import path from 'path';
import { enviroment } from 'src/helpers/enviroment';
import { FileData } from '../domain/interfaces/FormDataParser.interface';

import { HttpClient } from '../domain/interfaces/HttpClient.interface';

export class ImageDownloader {
  constructor(private http: HttpClient) {}

  public async download(url: string): Promise<FileData> {
    const response = await this.http.get<Blob>(url, { responseType: 'blob' });
    const { name, path } = await this.saveTmpFile(response);

    return {
      name,
      mimeType: response.type,
      orginalName: name,
      path,
      size: response.size,
    };
  }

  private async saveTmpFile(
    blob: Blob,
  ): Promise<{ path: string; name: string }> {
    const tmpDir = enviroment().dirs.temp;

    const ext = this.extractExtension(blob.type);
    const name = `${Date.now()}.${ext}`;
    const fileName = path.join(tmpDir, name);
    const buffer = Buffer.from(await blob.arrayBuffer());

    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, buffer, () => {
        console.log('image saved!');
        resolve({
          path: fileName,
          name,
        });
      });
    });
  }

  private extractExtension(mimeType: string): string {
    const isImage = mimeType.startsWith('image/');
    if (!isImage) throw new Error('Not an image');
    // TODO: custom error

    const extension = mimeType.split('/')[1];
    return extension;
  }
}

// funtion that receives a Blob and returns a ArrayBuffer
function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}
