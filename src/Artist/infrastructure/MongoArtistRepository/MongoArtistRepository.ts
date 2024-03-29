import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nullable } from 'src/helpers/types/Nullable.type';
import { PAGE_SIZE } from 'src/Shared/constansts/PageSize.constant';
import { Paginator } from 'src/Shared/domain/interfaces/Paginator.interface';

import { Artist, ArtistDTO } from '../../domain/Artist.model';
import { NotFoundArtistException } from '../../domain/exceptions/NotFoundArtist.exception';
import { ArtistRepository } from '../../domain/interfaces/ArtistRepository.interface';

import {
  ARTIST_NAME,
  MongoArtistDocument as MongoArtistSchema,
  MongoArtistModel,
} from './MongoArtist';

@Injectable()
export class MongoArtistRepository implements ArtistRepository {
  constructor(
    @InjectModel(ARTIST_NAME)
    private MongoArtistSchema: Model<MongoArtistSchema>,
  ) {}

  public async save(artist: Artist): Promise<Artist> {
    const artistEntity = new this.MongoArtistSchema(artist.toDto());
    await artistEntity.save();
    return artist;
  }

  public async find(uuid: string): Promise<Artist> {
    const artistDto: Nullable<ArtistDTO> = await this.MongoArtistSchema.findOne(
      { uuid },
    );

    if (!artistDto) throw new NotFoundArtistException();

    return new Artist(artistDto);
  }

  public async findAll(): Promise<Artist[]> {
    const artistDtos: ArtistDTO[] = await this.MongoArtistSchema.find();

    return artistDtos.map((artistDto) => new Artist(artistDto));
  }

  public async filter(
    query: any,
    paginator: Paginator<ArtistDTO>,
  ): Promise<Artist[]> {
    const { page, sort_by, order } = paginator;
    const pageSize = PAGE_SIZE;
    const from = ((page ?? 1) - 1) * pageSize;
    const skip = from;
    const limit = pageSize;

    const artistDtos: ArtistDTO[] = await this.MongoArtistSchema.find({
      ...query,
    })
      .skip(skip)
      .limit(limit)
      .sort({
        [sort_by ?? 'name']: order ?? 'asc',
      });

    return artistDtos.map((artistDto) => new Artist(artistDto));
  }

  public async count(query: any): Promise<number> {
    const count = await this.MongoArtistSchema.countDocuments(query);

    return count;
  }

  public async update(artist: Artist): Promise<Artist> {
    const artistEntity: Nullable<ArtistDTO> =
      await this.MongoArtistSchema.findOneAndUpdate(
        { uuid: artist.uuid.value },
        artist.toDto(),
      );

    if (!artistEntity) throw new NotFoundArtistException();

    return new Artist(artistEntity);
  }
}
