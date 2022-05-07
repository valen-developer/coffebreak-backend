import mongoose from "mongoose";
import { enviroment } from "../config/enviroment";

export const connectMongo = async (): Promise<mongoose.Connection> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      enviroment.db.uri,
      {
        authSource: "admin",
        auth: {
          username: enviroment.db.user,
          password: enviroment.db.password,
        },
      },
      (err) => {
        console.log(err);
      }
    );

    const mongooseConnection = mongoose.connection;

    mongooseConnection.on("error", (error) => {
      console.log(error);
    });

    mongooseConnection.once("open", () => {
      console.log("Connect to DB");
    });

    resolve(mongooseConnection);
  });
};
