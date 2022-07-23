import { JWT, JWT_CONFIG } from '../../Shared/domain/interfaces/JWT.interface';
import { NotFoundUserException } from '../domain/exceptions/NotUserFound.exception';
import { LoginReponse } from './LoginUser';
import { UserFinder } from './UserFinder';

export class GoogleLogin {
  constructor(private userFinder: UserFinder, private jwt: JWT) {}

  public async login(request: GoogleLoginRequest): Promise<LoginReponse> {
    const user = await this.userFinder.findByEmail(request.email);
    if (!user) throw new NotFoundUserException();

    const token = this.jwt.sign(
      {
        uuid: user.uuid.value,
      },
      JWT_CONFIG.secret,
    );

    return {
      token,
      user: user.toDtoWidthoutPassword(),
    };
  }
}

interface GoogleLoginRequest {
  email: string;
}
