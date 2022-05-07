import { PodcastAudioUrl } from "./valueObjects/PodcastAudioUrl.valueObject";
import { PodcastDescription } from "./valueObjects/PodcastDescription.valueObject";
import { PodcastDuration } from "./valueObjects/PodcastDuration.valueObject";
import { PodcastImageUrl } from "./valueObjects/PodcastImageUrl.valueObject";
import { PodcastPubDate } from "./valueObjects/PodcastPubDate.valueObject";
import { PodcastTitle } from "./valueObjects/PodcastTitle.valueObject";

export class PodcastEpisode {
  public readonly title: PodcastTitle;
  public readonly description: PodcastDescription;
  public readonly pubDate: PodcastPubDate;
  public readonly duration: PodcastDuration;
  public readonly imageUrl: PodcastImageUrl;
  public readonly audioUrl: PodcastAudioUrl;

  constructor(dto: PodcastEpisodeDTO) {
    this.title = new PodcastTitle(dto.title);
    this.description = new PodcastDescription(dto.description);
    this.duration = new PodcastDuration(dto.duration);
    this.imageUrl = new PodcastImageUrl(dto.imageUrl);
    this.audioUrl = new PodcastAudioUrl(dto.audioUrl);
    this.pubDate = PodcastPubDate.fromString(dto.pubDate);
  }

  public static fromValueObjects(
    dto: PodcastEpisodeValuObjectsDTO
  ): PodcastEpisode {
    return new PodcastEpisode({
      title: dto.title.value,
      description: dto.description.value,
      duration: dto.duration.value,
      imageUrl: dto.imageUrl.value,
      audioUrl: dto.audioUrl.value,
      pubDate: dto.pubDate.value.toString(),
    });
  }

  public toDTO(): PodcastEpisodeDTO {
    return {
      title: this.title.value,
      description: this.description.value,
      duration: this.duration.value,
      imageUrl: this.imageUrl.value,
      audioUrl: this.audioUrl.value,
      pubDate: this.pubDate.value.toString(),
    };
  }
}

export interface PodcastEpisodeDTO {
  title: string;
  description: string;
  pubDate: string;
  duration: number;
  imageUrl: string;
  audioUrl: string;
}

export interface PodcastEpisodeValuObjectsDTO {
  title: PodcastTitle;
  description: PodcastDescription;
  duration: PodcastDuration;
  imageUrl: PodcastImageUrl;
  audioUrl: PodcastAudioUrl;
  pubDate: PodcastPubDate;
}
