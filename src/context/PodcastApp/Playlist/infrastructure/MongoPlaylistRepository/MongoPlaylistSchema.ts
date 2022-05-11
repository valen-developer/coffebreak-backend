import mongoose, { Schema } from "mongoose";

const PlaylistSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  own: {
    type: String,
  },
  episodes: [
    {
      type: String,
    },
  ],
});

export const MongoPlaylistSchema: mongoose.Model<any, any, any> =
  mongoose.model("playlist", PlaylistSchema);
