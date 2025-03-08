import { PlaceDTO } from '../infraestructure/dtos/dtos';
import { Place } from './place';

export abstract class PlacesRepository {
  abstract createPlace(place: PlaceDTO): Promise<boolean>;

  abstract updatePlace(place: PlaceDTO): Promise<boolean>;

  abstract deletePlace(id: string, user: string): Promise<boolean>;

  abstract getPlaceById(id: string): Promise<Place | null>;

  abstract getPlacesByEventId(event_id: string): Promise<Place[]>;

  abstract getPlaces(): Promise<Place[]>;
}
