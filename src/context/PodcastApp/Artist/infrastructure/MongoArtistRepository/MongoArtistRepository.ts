import { Artist, ArtistDTO } from "../../domain/Artist.model";
import { ArtistQuery } from "../../domain/ArtistQuery";
import { NotFoundArtistException } from "../../domain/exceptions/NotFoundArtist.exception";
import { ArtistRepository } from "../../domain/interfaces/ArtistRepository.interface";
import { MongoArtistSchema } from "./MongoArtist";

export class MongoArtistRepository implements ArtistRepository {
  public async save(artist: Artist): Promise<Artist> {
    const artistEntity = new MongoArtistSchema(artist.toDto());
    await artistEntity.save();
    return artist;
  }

  public async find(uuid: string): Promise<Artist> {
    const artistDto: ArtistDTO = await MongoArtistSchema.findOne({ uuid });

    if (!artistDto) throw new NotFoundArtistException();

    return new Artist(artistDto);
  }

  public async findAll(): Promise<Artist[]> {
    const artistDtos: ArtistDTO[] = await MongoArtistSchema.find();

    return artistDtos.map((artistDto) => new Artist(artistDto));
  }

  public async filter(query: any): Promise<Artist[]> {
    const artistDtos: ArtistDTO[] = await MongoArtistSchema.find(query);

    return artistDtos.map((artistDto) => new Artist(artistDto));
  }

  public async update(artist: Artist): Promise<Artist> {
    const artistEntity = await MongoArtistSchema.findOneAndUpdate(
      { uuid: artist.uuid.value },
      artist.toDto()
    );

    return new Artist(artistEntity);
  }
}
