export abstract class Mailer {
  constructor(protected transporterParams: TransporterMailer) {}

  abstract sendMail(params: SendMailParams): Promise<boolean>;
}

export interface SendMailParams {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface TransporterMailer {
  host?: string;
  port?: number;
  secure?: boolean;
  service?: string;
  auth: {
    user: string;
    pass: string;
  };
}
