export abstract class HttpClient {
  abstract get<T>(url: string, opt?: HttpOptions): Promise<T>;
}

export interface HttpOptions {
  responseType?: "json" | "text" | "blob";
}
