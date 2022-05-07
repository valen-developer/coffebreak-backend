import { HttpClient } from "../domain/interfaces/HttpClient.interface";
import fetch from "node-fetch";

export class NodeFetchHttpClient implements HttpClient {
  public async get<T>(url: string, responseSting = false): Promise<T> {
    return fetch(url).then((response) => {
      if (responseSting) {
        return response.text();
      }

      return response.json();
    });
  }
}
