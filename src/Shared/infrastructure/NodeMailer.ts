import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import {
  Mailer,
  SendMailParams,
  TransporterMailer,
} from '../domain/interfaces/Mailer.interface';

export class NodeMailer extends Mailer {
  private transporter: Mail;

  constructor(protected transporterParams: TransporterMailer) {
    super(transporterParams);
    this.transporter = nodemailer.createTransport(transporterParams);
  }

  public async sendMail(params: SendMailParams): Promise<boolean> {
    const { to, from, subject, html } = params;

    return await this.transporter
      .sendMail({
        from: from,
        to: to,
        subject,
        html,
      })
      .then(() => true)
      .catch((error) => {
        console.log('🚀 -> NodeMailer -> error', error);

        return false;
      });
  }
}
