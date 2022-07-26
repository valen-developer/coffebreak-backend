import { Injectable } from '@nestjs/common';
import { enviroment } from 'src/helpers/enviroment';
import { registerHTML } from 'src/helpers/templates/registerHTML.template';
import { Events } from 'src/Shared/domain/constants/Events';
import { EventEmitter } from 'src/Shared/domain/interfaces/EventEmitter';
import { JWT, JWT_CONFIG } from 'src/Shared/domain/interfaces/JWT.interface';
import { Mailer } from 'src/Shared/domain/interfaces/Mailer.interface';
import { User } from '../domain/User.mode';

@Injectable()
export class OnPasswordRecoveryEmailSender {
  constructor(
    private eventEmitter: EventEmitter,
    private jwt: JWT,
    private mailer: Mailer,
  ) {
    this.eventEmitter.on(Events.USER_RECOVERY_PASSWORD, (user: User) => {
      this.send(user);
    });
  }

  public async send(user: User): Promise<void> {
    const token = this.jwt.sign(
      {
        uuid: user.uuid.value,
      },
      JWT_CONFIG.secret,
    );
    const html = registerHTML(user, token);

    try {
      await this.mailer.sendMail({
        from: enviroment().mailer.mail,
        to: user.email.value,
        subject: 'Coffebreak - Recuperación de contraseña',
        html,
      });
    } catch (error) {}
  }
}
