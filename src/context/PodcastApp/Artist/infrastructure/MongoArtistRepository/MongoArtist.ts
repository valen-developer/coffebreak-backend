import mongoose, { Schema } from "mongoose";

const MongoArtist = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  episodes: [Number],
});

export const MongoArtistSchema: mongoose.Model<any, any, any> = mongoose.model(
  "artist",
  MongoArtist
);
