import { FileData } from "./FormDataParser.interface";

export abstract class FileUploader {
  /**
   *
   * @param file file data information
   * @returns file path
   */
  abstract uploadImage(file: FileData): Promise<string>;
  abstract deleteImage(filePath: string): Promise<void>;
  abstract duplicateImage(filePath: string, newName: string): Promise<string>;
}
