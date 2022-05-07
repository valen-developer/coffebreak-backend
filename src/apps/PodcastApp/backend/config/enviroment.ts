export const enviroment = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI || "mongodb://localhost:27017/coffebreak",
    user: process.env.USER_DB || "admin",
    password: process.env.PASSWORD_DB || "admin",
  },
};
