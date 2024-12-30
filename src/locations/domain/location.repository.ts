import { Location } from './location.entity';

export interface LocationRepository {
  createLocation(location: Location): Promise<boolean>;

  updateLocation(location: Location): Promise<boolean>;

  deleteLocation(id: string): Promise<boolean>;

  getLocationById(id: string): Promise<Location | null>;

  getLocations(): Promise<Location[]>;
}
