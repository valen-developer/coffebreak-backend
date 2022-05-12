export abstract class FormDataParser {
  abstract parse<T>(req: any): Promise<FormDataResponse<T>>;
}

export interface FormDataResponse<T> {
  fields: T;
  files: FileData[];
}

export interface FileData {
  orginalName: string;
  mimeType: string;
  path: string;
  size: number;
}
