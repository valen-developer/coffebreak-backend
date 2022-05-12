export abstract class HttpClient {
  abstract get<T>(url: string, responseSting?: boolean): Promise<T>;
}
