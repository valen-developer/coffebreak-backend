export interface PodcastEpisodeQuery {
  title_contains: string;
  published_lte: Date;
  published_gte: Date;
  description_contains: string;
  duration_lte: number;
  duration_gte: number;
}
