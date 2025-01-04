import { HttpStatus, Injectable } from '@nestjs/common';
import { LocationService } from '../infraestructure/location.service';
import { ICreateLocationDto } from '../infraestructure/dtos/crud';
import { Location } from '../domain/location';
import { IResponse } from '../../shared/domain/IResponse';

@Injectable()
export class LocationApplication {
  constructor(private readonly locationService: LocationService) {}

  public async createLocation(
    data: ICreateLocationDto,
    user: string,
  ): Promise<IResponse<Location>> {
    const newLocation = Location.dtoToLocation(data);
    newLocation.user_creator = user;

    if (!newLocation.isValid()) {
      return {
        error: true,
        data: null,
        message: 'Invalid data to create the location',
        code: HttpStatus.BAD_REQUEST,
        type: 'Location',
      };
    }

    try {
      const isCreated = await this.locationService.createLocation(newLocation);
      if (isCreated) {
        return {
          error: false,
          data: newLocation,
          message: 'Location created successfully',
          code: HttpStatus.CREATED,
          type: 'Location',
        };
      }

      return {
        error: true,
        data: null,
        message: 'Failed to create the location',
        code: HttpStatus.ACCEPTED,
        type: 'Location',
      };
    } catch (error) {
      return {
        error: true,
        data: null,
        message: 'An error occurred while creating the location, err: ' + error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Location',
      };
    }
  }

  public async updateLocation(
    data: ICreateLocationDto,
  ): Promise<IResponse<Location>> {
    const newLocation = Location.dtoToLocation(data);

    if (!newLocation.isValid()) {
      return {
        error: true,
        data: null,
        message: 'Invalid data to update the location',
        code: HttpStatus.BAD_REQUEST,
        type: 'Location',
      };
    }

    try {
      const isUpdated = await this.locationService.updateLocation(newLocation);
      if (isUpdated) {
        return {
          error: false,
          data: newLocation,
          message: 'Location updated successfully',
          code: HttpStatus.OK,
          type: 'Location',
        };
      }

      return {
        error: true,
        data: null,
        message: 'Failed to update the location',
        code: HttpStatus.ACCEPTED,
        type: 'Location',
      };
    } catch (error) {
      return {
        error: true,
        data: null,
        message: 'An error occurred while updating the location, err: ' + error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Location',
      };
    }
  }

  public async deleteLocation(id: string, user: string): Promise<IResponse> {
    try {
      const isDeleted = await this.locationService.deleteLocation(id, user);
      if (isDeleted) {
        return {
          error: false,
          data: null,
          message: 'Location deleted successfully',
          code: HttpStatus.OK,
          type: 'Location',
        };
      }

      return {
        error: true,
        data: null,
        message: 'Failed to delete the location',
        code: HttpStatus.ACCEPTED,
        type: 'Location',
      };
    } catch (error) {
      return {
        error: true,
        data: null,
        message: 'An error occurred while deleting the location, err: ' + error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Location',
      };
    }
  }

  public async getLocationById(id: string): Promise<IResponse<Location>> {
    try {
      const location = await this.locationService.getLocationById(id);
      if (location) {
        return {
          error: false,
          data: location,
          message: 'Location found successfully',
          code: HttpStatus.OK,
          type: 'Location',
        };
      }

      return {
        error: true,
        data: null,
        message: 'Location not found',
        code: HttpStatus.NOT_FOUND,
        type: 'Location',
      };
    } catch (error) {
      return {
        error: true,
        data: null,
        message: 'An error occurred while getting the location, err: ' + error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Location',
      };
    }
  }

  public async getLocations(): Promise<IResponse<Location[]>> {
    try {
      const locations = await this.locationService.getLocations();
      return {
        error: false,
        data: locations,
        message: 'Locations found successfully',
        code: HttpStatus.OK,
        type: 'Location',
      };
    } catch (error) {
      return {
        error: true,
        data: [],
        message: 'An error occurred while getting the locations, err: ' + error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Location',
      };
    }
  }
}
