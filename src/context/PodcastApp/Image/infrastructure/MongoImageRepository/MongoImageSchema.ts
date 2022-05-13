import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  entityUuid: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

export const MongoImageSchema: mongoose.Model<any, any, any> = mongoose.model(
  "image",
  ImageSchema
);
