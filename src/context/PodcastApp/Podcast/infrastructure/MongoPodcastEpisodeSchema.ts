import mongoose from "mongoose";

const { Schema } = mongoose;

const PodcastEpisodeSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  pubDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  episode: {
    type: Number,
  },
});

export const MongoPodcastEpisodeSchema: mongoose.Model<any, any, any> =
  mongoose.model("episode", PodcastEpisodeSchema);
