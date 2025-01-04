import { HttpStatus, Injectable } from '@nestjs/common';
import { ZonesService } from '../infraestructure/zones.service';
import { IResponse } from '../../shared/domain/IResponse';
import { ICreateZoneDTO, IUpdateZoneDTO } from '../infraestructure/dtos/crud';
import { Zone } from '../domain/zone';

@Injectable()
export class ZonesApplication {
  constructor(private readonly zonesService: ZonesService) {}

  public async createZone(
    zone: ICreateZoneDTO,
    user: string,
  ): Promise<IResponse<Zone>> {
    const newZone = Zone.dtoToZone(zone);
    newZone.user_creator = user;

    if (!newZone.isValid()) {
      return {
        error: true,
        data: null,
        message: 'Invalid zone data',
        code: HttpStatus.BAD_REQUEST,
        type: 'Zone',
      };
    }

    try {
      const isCreated = await this.zonesService.createZone(newZone);
      if (isCreated) {
        return {
          error: false,
          data: newZone,
          message: 'Zone created successfully',
          code: HttpStatus.CREATED,
          type: 'Zone',
        };
      }
      return {
        error: true,
        data: null,
        message: 'Failed to create the zone',
        code: HttpStatus.ACCEPTED,
        type: 'Zone',
      };
    } catch (error) {
      return {
        error: true,
        data: null,
        message: 'An error occurred while creating the zone, err: ' + error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Zone',
      };
    }
  }

  public async getZones(): Promise<IResponse<Zone[]>> {
    try {
      const zones = await this.zonesService.getZones();
      return {
        error: false,
        data: zones,
        message: 'Zones fetched successfully',
        code: HttpStatus.OK,
        type: 'Zone',
      };
    } catch (error) {
      return {
        error: true,
        data: null,
        message: 'An error occurred while fetching the zones, err: ' + error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Zone',
      };
    }
  }

  public async getZoneById(id: string): Promise<IResponse<Zone>> {
    try {
      const zone = await this.zonesService.getZoneById(id);
      if (zone) {
        return {
          error: false,
          data: zone,
          message: 'Zone fetched successfully',
          code: HttpStatus.OK,
          type: 'Zone',
        };
      }
      return {
        error: true,
        data: null,
        message: 'Zone not found',
        code: HttpStatus.NOT_FOUND,
        type: 'Zone',
      };
    } catch (error) {
      return {
        error: true,
        data: null,
        message: 'An error occurred while fetching the zone, err: ' + error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Zone',
      };
    }
  }

  public async updateZone(zone: IUpdateZoneDTO): Promise<IResponse<Zone>> {
    const updatedZone = Zone.dtoToZone(zone);

    if (!updatedZone.isValid()) {
      return {
        error: true,
        data: null,
        message: 'Invalid zone data',
        code: HttpStatus.BAD_REQUEST,
        type: 'Zone',
      };
    }

    try {
      const isUpdated = await this.zonesService.updateZone(updatedZone);
      if (isUpdated) {
        return {
          error: false,
          data: updatedZone,
          message: 'Zone updated successfully',
          code: HttpStatus.OK,
          type: 'Zone',
        };
      }
      return {
        error: true,
        data: null,
        message: 'Failed to update the zone',
        code: HttpStatus.ACCEPTED,
        type: 'Zone',
      };
    } catch (error) {
      return {
        error: true,
        data: null,
        message: 'An error occurred while updating the zone, err: ' + error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Zone',
      };
    }
  }

  public async deleteZone(id: string, user: string): Promise<IResponse<Zone>> {
    try {
      const isDeleted = await this.zonesService.deleteZone(id, user);
      if (isDeleted) {
        return {
          error: false,
          data: null,
          message: 'Zone deleted successfully',
          code: HttpStatus.OK,
          type: 'Zone',
        };
      }
      return {
        error: true,
        data: null,
        message: 'Failed to delete the zone',
        code: HttpStatus.ACCEPTED,
        type: 'Zone',
      };
    } catch (error) {
      return {
        error: true,
        data: null,
        message: 'An error occurred while deleting the zone, err: ' + error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Zone',
      };
    }
  }
}
