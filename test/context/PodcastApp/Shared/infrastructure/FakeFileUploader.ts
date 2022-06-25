import { FileUploader } from "../../../../../src/context/PodcastApp/Shared/domain/interfaces/FileUploader";
import { FileData } from "../../../../../src/context/PodcastApp/Shared/domain/interfaces/FormDataParser.interface";

export class FakeFileUploader implements FileUploader {
  uploadImage(file: FileData): Promise<string> {
    return Promise.resolve("");
  }
  deleteImage(filePath: string): Promise<void> {
    return Promise.resolve();
  }
  duplicateImage(filePath: string, newName: string): Promise<string> {
    return Promise.resolve("");
  }
}
