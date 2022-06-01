import jwt from "jsonwebtoken";

import { JWT } from "../domain/interfaces/JWT.interface";

export class JsonWebTokenJWT implements JWT {
  sign(payload: any, secret: string, options?: Object | undefined): string {
    return jwt.sign(payload, secret, options);
  }
  verify(token: string, secret: string, options?: Object | undefined) {
    return jwt.verify(token, secret, options);
  }
  decode(token: string, options?: Object | undefined) {
    return jwt.decode(token, options);
  }
}
