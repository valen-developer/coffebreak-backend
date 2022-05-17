import { Nullable } from "../../../../helpers/types/Nullable.type";
import { Paginator } from "../../Shared/domain/interfaces/Paginator.interface";
import { PodcastEpisodeRepository } from "../domain/interfaces/PodcastEpisodeRepository.interface";
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from "../domain/PodcastEpisode.model";
import { MongoPodcastEpisodeSchema } from "./MongoPodcastEpisodeSchema";

export class MongoPodcastEpisodeRepository implements PodcastEpisodeRepository {
  public async save(episode: PodcastEpisode): Promise<void> {
    await MongoPodcastEpisodeSchema.create(episode.toDTO());
  }

  public async filter(
    query: any,
    paginator: Paginator<PodcastEpisodeDTO>
  ): Promise<PodcastEpisode[]> {
    const { from, limit, sort_by, order } = paginator;

    const episodesObjects: PodcastEpisodeDTO[] =
      await MongoPodcastEpisodeSchema.find(query)
        .skip(from)
        .limit(limit)
        .sort({ [sort_by ?? "pubDate"]: order ?? "asc" });

    return (
      episodesObjects.map(
        (episodeObject) => new PodcastEpisode(episodeObject)
      ) ?? []
    );
  }

  /* It's finding the last published episode. */
  public async findLastPublished(): Promise<Nullable<PodcastEpisode>> {
    const episodeObject: Nullable<PodcastEpisodeDTO> =
      await MongoPodcastEpisodeSchema.findOne({}).sort({ pubDate: -1 });

    if (!episodeObject) throw new Error("Not found");

    return new PodcastEpisode(episodeObject);
  }

  public async findByArray(uuids: string[]): Promise<PodcastEpisode[]> {
    // sort by episode.episode
    const episodesObjects: PodcastEpisodeDTO[] =
      await MongoPodcastEpisodeSchema.find({
        uuid: { $in: uuids },
      }).sort({ episode: "desc" });

    return (
      episodesObjects.map(
        (episodeObject) => new PodcastEpisode(episodeObject)
      ) ?? []
    );
  }
}
