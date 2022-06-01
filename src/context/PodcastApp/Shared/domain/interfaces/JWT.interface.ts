export abstract class JWT {
  abstract sign(payload: any, secret: string, options?: Object): string;
  abstract verify(token: string, secret: string, options?: Object): any;

  abstract decode(token: string, options?: Object): any;
}
