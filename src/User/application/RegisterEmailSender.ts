import { enviroment } from 'src/helpers/enviroment';
import { registerHTML } from 'src/helpers/templates/registerHTML.template';
import { Events } from '../../Shared/domain/constants/Events';
import { EventEmitter } from '../../Shared/domain/interfaces/EventEmitter';
import { JWT, JWT_CONFIG } from '../../Shared/domain/interfaces/JWT.interface';
import { Mailer } from '../../Shared/domain/interfaces/Mailer.interface';
import { User } from '../domain/User.mode';

export class RegisterEmailSender {
  constructor(
    private eventEmitter: EventEmitter,
    private mailer: Mailer,
    private jwt: JWT,
  ) {
    this.eventEmitter.on(Events.USER_SIGNUP, (user: User) => {
      this.emit(user);
    });

    this.eventEmitter.on(Events.USER_RECOVERY_PASSWORD, (user: User) => {
      this.emit(user);
    });
  }

  public async emit(user: User): Promise<void> {
    const token = this.jwt.sign({ uuid: user.uuid.value }, JWT_CONFIG.secret);
    const html = registerHTML(user, token);

    await this.mailer.sendMail({
      from: enviroment().mailer.mail,
      to: user.email.value,
      subject: 'Coffebreak - Confirma tu cuenta',
      html,
    });
  }
}
