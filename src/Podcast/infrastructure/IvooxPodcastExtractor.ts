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

    try {
      const dataAsString = await httpClient.get<string>(
        this._IVOOX_PODCAST_URL,
        {
          responseType: 'text',
        },
      );

      const data = await this.parseXml(dataAsString);
      const episodes = this.buildPodcastEpisode(data);

      const filteredByDate = this.filterByDate(episodes, from);

      return filteredByDate;
    } catch (error) {
      return [];
    }
  }

  public extractTracks(
    description: string,
  ): { time: string; trackName: string }[] {
    const replaceAll = (str: string, find: RegExp, replace: string) => {
      return str.replace(new RegExp(find.source, 'g'), replace);
    };

    description = replaceAll(description, /.*En el episodio de hoy:/, ';');
    description = replaceAll(description, /Contertulios/, ';');
    // replace . with ;
    description = replaceAll(description, /\./g, ';');

    description = replaceAll(description, /&aacute;/g, 'a');
    description = replaceAll(description, /&eacute;/g, 'e');
    description = replaceAll(description, /&iacute;/g, 'i');
    description = replaceAll(description, /&oacute;/g, 'o');
    description = replaceAll(description, /&uacute;/g, 'u');
    description = replaceAll(description, /&ntilde;/g, 'ñ');

    const tracks1 = description.split(';').map((track) => {
      // regex2 = (min dd:dd:dd)
      const regex2 = /\((min.*[0-9:]+)\)/i;
      const match2 = track.match(regex2);

      if (!match2) return null;

      // extract digits after "("
      let digits = match2[0]
        .replace('min ', '')
        .replace('(', '')
        .replace(')', '');

      let time = digits;
      let trackName = track.split('(')[0];

      return {
        time,
        trackName,
      };
    });

    const tracks = description.split(';').map((track) => {
      let regex = /\(([0-9:]+)\)/i;
      let match = track.match(regex);

      if (!match) return null;

      let time = match[1];
      let trackName = track.replace(regex, '');

      return {
        time,
        trackName,
      };
    });

    const totalTracks = cleanArray([...tracks1, ...tracks]);

    const fixedTracks: any[] = [];
    totalTracks.forEach((track) => {
      // if track.time is 00:00 -> 00:00:00
      const time =
        track.time.length <= 3
          ? `00:00:${track.time}`
          : track.time.length <= 5
          ? `00:${track.time}`
          : track.time;

      const [hours, minutes, seconds] = time.split(':').map((t) => {
        return t.length === 1 ? `0${t}` : t;
      });

      const fixedTime = `${hours}:${minutes}:${seconds}`;
      const trackName = track.trackName;

      // check if exist time in track
      const found = fixedTracks.find((fixedTrack) => {
        return fixedTrack.time === fixedTime;
      });

      if (found) return null;

      fixedTracks.push({
        time: fixedTime,
        trackName,
      });
    });

    return cleanArray(fixedTracks);
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
    let match1 = title.match(regex);

    let regex2 = /Ep\s+[0-9]+/i;
    let match2 = title.match(regex2);

    const is351 = title.includes('115');
    if (is351) {
      console.log('es');
    }

    const hasMatch = match1 || match2;
    if (!hasMatch) return null;

    const match = match1 ? match1[0] : match2 ? match2[0] : null;
    if (!match) return null;

    // remove all non-numeric characters
    let digits = match.replace(/Ep\s+/i, '');

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
