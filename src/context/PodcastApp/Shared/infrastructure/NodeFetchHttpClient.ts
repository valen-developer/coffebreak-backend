import {
  HttpClient,
  HttpOptions,
} from "../domain/interfaces/HttpClient.interface";
import fetch from "node-fetch";

export class NodeFetchHttpClient implements HttpClient {
  public async get<T>(url: string, opt: HttpOptions): Promise<T> {
    const type = opt.responseType || "json";

    return fetch(url).then((response) => {
      if (type === "text") {
        return response.text();
      }

      if (type === "blob") {
        return response.blob();
      }

      return response.json();
    });
  }
}
