import path from 'path';

export const enviroment = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/coffebreak',
    user: process.env.USER_DB || 'admin',
    password: process.env.PASSWORD_DB || 'admin',
  },
  dirs: {
    temp: path.join(__dirname, '../../../../../temp'),
    images: path.join(__dirname, '../../../../../images'),
  },
  googleKeys: {
    cliendId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  mailer: {
    mail: process.env.MAILER_MAIL || '',
    password: process.env.MAILER_PASSWORD || '',
    port: process.env.MAILER_PORT || '',
    service: process.env.MAILER_SERVICE || '',
    host: process.env.MAILER_HOST || '',
  },
  webappUrl: process.env.WEBAPP_URL || 'http://192.168.0.17:4200',
};
