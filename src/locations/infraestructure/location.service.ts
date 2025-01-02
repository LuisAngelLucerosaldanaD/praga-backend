import { Injectable } from '@nestjs/common';
import { LocationRepository } from '../domain/location.repository';
import { Location } from '../domain/location.entity';

@Injectable()
export class LocationService implements LocationRepository {
  public async createLocation(location: Location): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async deleteLocation(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async getLocationById(id: string): Promise<Location | null> {
    return Promise.resolve(undefined);
  }

  public async getLocations(): Promise<Location[]> {
    return Promise.resolve([]);
  }

  public async updateLocation(location: Location): Promise<boolean> {
    return Promise.resolve(false);
  }
}
