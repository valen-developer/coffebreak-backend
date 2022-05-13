import { injectImageDependencies } from "./injectImageDependencies";
import { injectPlaylistDependencies } from "./injectPlaylistDependencies";
import { injectPodcastEpisodiesDependencies } from "./injectPodcastEpisodiesDependencies";
import { injectRepositories } from "./injectRepositories";
import { injectUtils } from "./injectUtils";

export const injectAll = () => {
  injectUtils();
  injectRepositories();

  injectImageDependencies();

  injectPodcastEpisodiesDependencies();
  injectPlaylistDependencies();
};
