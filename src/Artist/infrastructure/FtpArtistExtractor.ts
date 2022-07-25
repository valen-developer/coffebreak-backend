import * as fs from 'fs';
import * as path from 'path';

import { spawn } from 'child_process';

import { PodcastEpisodeFinder } from '../../Podcast/application/PodcastEpisodeFinder';
import { Artist } from '../domain/Artist.model';
import { ArtistExtractor } from '../domain/interfaces/ArtistExtractor.interface';
import { ArtistCreatorForExtraction } from '../application/ArtistCreatorForExtraction';
import { asyncMap } from 'src/helpers/functions/asyncMap.function';
import { enviroment } from 'src/helpers/enviroment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FtpArtistExtractor extends ArtistExtractor {
  private _ftpArtisUrl = 'ftp://ftp.iac.es/pub/pcoffeebreak/cbinfo.txt';

  constructor(
    protected episodeFinder: PodcastEpisodeFinder,
    private artistCreator: ArtistCreatorForExtraction,
  ) {
    super(episodeFinder);
  }

  public async extract(): Promise<Artist[]> {
    return this.get(this._ftpArtisUrl).catch(() => []);
  }

  public async get(url: string): Promise<Artist[]> {
    const data = await this.saveTmpFile(url);
    await this.cleanTmpFile(data);
    const relations = await this.getArtistsEpisodes(data);

    try {
      return await asyncMap(relations, async (rl) => {
        const artist = await this.saveArtist(rl.artistName);
        artist.setEpisodes(rl.episodes);
        await this.updateArtist(artist);

        return artist;
      });
    } catch (error) {
      return [];
    }
  }

  private saveTmpFile(url: string): Promise<string> {
    const tmpFile = path.join(enviroment().dirs.temp, 'cbinfo.txt');
    const wget = spawn('wget', ['--output-document', `${tmpFile}`, url]);

    return new Promise((resolve, reject) => {
      const { stdout } = wget;

      wget.on('error', (err) => reject(err));
      stdout.on('error', (err) => reject(err));

      stdout.on('data', (data) => {
        resolve(tmpFile);
      });

      wget.on('close', (code) => {
        const error = code !== 0;
        if (error) return reject(new Error('Error downloading file'));

        resolve(tmpFile);
      });
    });
  }

  private cleanTmpFile(tmpFile: string): Promise<void> {
    // Borrar lineas hasta que aparezca: "Contertulios y episodios en que participa"
    return new Promise((resolve, reject) => {
      const file = fs.readFileSync(tmpFile, 'utf8');
      const lines = file.split('\n');
      const lineBreakIndex = lines.findIndex((line) =>
        line.includes('Contertulios y episodios en que participa'),
      );
      const newLines = lines.slice(lineBreakIndex + 1, lines.length);

      const newFile = newLines.join('\n');
      fs.writeFileSync(tmpFile, newFile);

      resolve();
    });
  }

  private getArtistsEpisodes(
    tmpFile: string,
  ): Promise<ArtistEpisodeInterface[]> {
    // Leer el fichero y obtener los artistas: "Nombre del artista: ep1, ep2, ep3"
    return new Promise((resolve, reject) => {
      const file = fs.readFileSync(tmpFile, 'utf8');
      const lines = file.split('\n');
      // remove empty lines
      const newLines = lines.filter((line) => line !== '');
      const artists: ArtistEpisodeInterface[] = newLines.map((line) => {
        const [name, episodes] = line.split(':');
        return {
          artistName: name,
          episodes: episodes.split(',').map((episode) => {
            //remove "(\d+)" from episode
            let regex = /\(.*\)/i;
            let match = regex.exec(episode);
            if (match) {
              episode = episode.replace(match[0], '');
            }

            episode.trim();
            return Number(episode);
          }),
        };
      });

      resolve(artists);
    });
  }

  private saveArtist(name: string): Promise<Artist> {
    return this.artistCreator.create(name);
  }

  private updateArtist(artist: Artist): Promise<Artist> {
    return this.artistCreator.update(artist);
  }
}

interface ArtistEpisodeInterface {
  artistName: string;
  episodes: number[];
}
