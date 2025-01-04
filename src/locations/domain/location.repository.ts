import { Location } from './location';

export interface LocationRepository {
  createLocation(location: Location): Promise<boolean>;

  updateLocation(location: Location): Promise<boolean>;

  deleteLocation(id: string, user: string): Promise<boolean>;

  getLocationById(id: string): Promise<Location | null>;

  getLocations(): Promise<Location[]>;
}
