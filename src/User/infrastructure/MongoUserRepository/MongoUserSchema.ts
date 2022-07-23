import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export const MongoUser: mongoose.Model<any, any, any> = mongoose.model(
  "user",
  UserSchema
);
