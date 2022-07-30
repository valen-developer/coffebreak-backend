import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWT, JWT_CONFIG } from 'src/Shared/domain/interfaces/JWT.interface';
import { UserFinder } from 'src/User/application/UserFinder';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private jwt: JWT, private userFinder: UserFinder) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const headers = req.headers;
      // extract Bearer token from Authorization header (format Bearer <token>)
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) throw new Error('Token not found');

      // validate token
      const isValid = await this.jwt.verify(token, JWT_CONFIG.secret);
      if (!isValid) throw new Error('Invalid token');

      const decoded = this.jwt.decode(token);
      const { uuid } = decoded;
      req.body.userTokenUuid = uuid;

      // get user from token
      const user = await this.userFinder.findByUuid(uuid);

      if (!user) throw new Error('User not found');
      req.body = {
        ...req.body,
        session: { user },
      };

      return true;
    } catch (error) {
      return false;
    }
  }
}
