import { parseString } from 'xml2js';

import { cleanArray } from 'src/helpers/functions/cleanArray.function';
import { Nullable } from 'src/helpers/types/Nullable.type';

import { HttpClient } from '../../Shared/domain/interfaces/HttpClient.interface';
import { UUIDGenerator } from '../../Shared/domain/interfaces/UuidGenerator';
import { UUID } from '../../Shared/domain/valueObjects/Uuid.valueObject';
import { PodcastExtractor } from '../domain/interfaces/PodcastExtractor.interface';
import { PodcastEpisode } from '../domain/PodcastEpisode.model';
import { PodcastAudioUrl } from '../domain/valueObjects/PodcastAudioUrl.valueObject';
import { PodcastDescription } from '../domain/valueObjects/PodcastDescription.valueObject';
import { PodcastDuration } from '../domain/valueObjects/PodcastDuration.valueObject';
import { PodcastImageUrl } from '../domain/valueObjects/PodcastImageUrl.valueObject';
import { PodcastPubDate } from '../domain/valueObjects/PodcastPubDate.valueObject';
import { PodcastTitle } from '../domain/valueObjects/PodcastTitle.valueObject';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IvooxPodcastExtractor implements PodcastExtractor {
  private _IVOOX_PODCAST_URL =
    'https://www.ivoox.com/feed_fg_f1172891_filtro_1.xml';

  private uuidGenerator!: UUIDGenerator;

  public async extract(
    httpClient: HttpClient,
    uuidGenerator: UUIDGenerator,
    from?: Date,
  ): Promise<any[]> {
    this.uuidGenerator = uuidGenerator;

    const dataAsString = await httpClient.get<string>(this._IVOOX_PODCAST_URL, {
      responseType: 'text',
    });

    const data = await this.parseXml(dataAsString);
    const episodes = this.buildPodcastEpisode(data);

    const filteredByDate = this.filterByDate(episodes, from);

    return filteredByDate;
  }

  private async parseXml(xml: string): Promise<IvooxResponse> {
    return new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  private buildPodcastEpisode(data: IvooxResponse): PodcastEpisode[] {
    const items = data.rss.channel[0].item;

    const episodes = items.map((item) => {
      const title = item['title'][0];
      const ep = this.getEpisodeNumber(title);
      const description = item['description'][0];
      const pubDate = item['pubDate'][0];
      const duration = item['itunes:duration'][0];
      const imageUrl = item['itunes:image'][0].$.href;
      const audioUrl = item['enclosure'][0].$.url;

      try {
        const titleValueObject = new PodcastTitle(title);
        const descriptionValueObject = new PodcastDescription(description);
        const pubDateValueObject = PodcastPubDate.fromString(pubDate);
        const durationValueObject = PodcastDuration.fromString(duration);
        const imageUrlValueObject = new PodcastImageUrl(imageUrl);
        const audioUrlValueObject = new PodcastAudioUrl(audioUrl);

        const episode = PodcastEpisode.fromValueObjects({
          uuid: new UUID(this.uuidGenerator?.generate()),
          title: titleValueObject,
          episode: ep as number,
          description: descriptionValueObject,
          pubDate: pubDateValueObject,
          duration: durationValueObject,
          imageUrl: imageUrlValueObject,
          audioUrl: audioUrlValueObject,
        });

        return episode;
      } catch (error) {
        return null;
      }
    });

    return cleanArray<PodcastEpisode>(episodes);
  }

  private filterByDate(
    episodes: PodcastEpisode[],
    date: Nullable<Date>,
  ): PodcastEpisode[] {
    if (!date) return episodes;

    return episodes.filter((episode) => {
      const isAfter = episode.pubDate.ifAfter(date);
      return isAfter;
    });
  }

  private getEpisodeNumber(title: string): Nullable<number> {
    let regex = /Ep[0-9]+/i;
    let match = title.match(regex);

    if (!match) return null;

    // extract digits after "Ep"
    let digits = match[0].substring(2);

    // remove all non-digits
    digits = digits.replace(/\D/g, '');

    // convert to number
    return Number(digits);
  }
}

interface IvooxResponse {
  rss: {
    channel: {
      item: {
        enclosure: [{ $: { url: string } }];
        title: string[];
        description: string[];
        pubDate: string[];
        'itunes:duration': string[];
        'itunes:image': [{ $: { href: string } }];
      }[];
    }[];
  };
}