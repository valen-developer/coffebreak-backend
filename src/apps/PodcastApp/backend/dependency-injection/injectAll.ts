import { injectArtistDependencies } from "./injectArtistDependencies";
import { injectImageDependencies } from "./injectImageDependencies";
import { injectPlaylistDependencies } from "./injectPlaylistDependencies";
import { injectPodcastEpisodiesDependencies } from "./injectPodcastEpisodiesDependencies";
import { injectRepositories } from "./injectRepositories";
import { injectUserDependencies } from "./injectUserDependencies";
import { injectUtils } from "./injectUtils";

export const injectAll = () => {
  injectUtils();
  injectRepositories();

  injectImageDependencies();

  injectPodcastEpisodiesDependencies();
  injectPlaylistDependencies();
  injectUserDependencies();
  injectArtistDependencies();
};
