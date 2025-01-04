import { Injectable, Logger } from '@nestjs/common';
import { LocationRepository } from '../domain/location.repository';
import { Location } from '../domain/location';
import { DatabaseService } from '../../shared/infraestructure/persistence/database.service';

@Injectable()
export class LocationService implements LocationRepository {
  private readonly logger = new Logger(LocationService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async createLocation(location: Location): Promise<boolean> {
    this.logger.debug(
      `Executing query: createLocation (${JSON.stringify(location)})`,
    );
    const query = `INSERT INTO config.locations (id, name, description, address, phone, email, capacity, user_creator)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    try {
      await this.dbService.execute(query, [
        location.id,
        location.name,
        location.description,
        location.address,
        location.phone,
        location.email,
        location.capacity,
        location.user_creator,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createLocation (${JSON.stringify(location)}), error: ${error}`,
      );
      return false;
    }
  }

  public async deleteLocation(id: string, user: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteLocation (${id})`);
    const query = `UPDATE config.locations
                   set is_delete    = true,
                       deleted_at   = now(),
                       user_deleter = $2
                   WHERE id = $1`;
    try {
      const res = await this.dbService.execute(query, [id, user]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteLocation (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getLocationById(id: string): Promise<Location | null> {
    this.logger.debug(`Executing query: getLocationById (${id})`);
    const query = `SELECT id,
                          name,
                          description,
                          address,
                          phone,
                          email,
                          capacity,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM config.locations
                   WHERE id = $1
                     and is_delete = false`;
    try {
      const res = await this.dbService.execute(query, [id]);
      return res.rows[0];
    } catch (error) {
      this.logger.error(
        `Error executing query getLocationById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getLocations(): Promise<Location[]> {
    this.logger.debug(`Executing query: getLocations`);
    const query = `SELECT id,
                          name,
                          description,
                          address,
                          phone,
                          email,
                          capacity,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM config.locations
                   where is_delete = false`;
    try {
      const res = await this.dbService.execute(query, []);
      return res.rows;
    } catch (error) {
      this.logger.error(`Error executing query getLocations, error: ${error}`);
      return [];
    }
  }

  public async updateLocation(location: Location): Promise<boolean> {
    this.logger.debug(
      `Executing query: updateLocation (${JSON.stringify(location)})`,
    );
    const query = `UPDATE config.locations
                   set name        = $2,
                       description = $3,
                       address     = $4,
                       phone       = $5,
                       email       = $6,
                       capacity    = $7,
                       updated_at  = now()
                   WHERE id = $1`;
    try {
      const res = await this.dbService.execute(query, [
        location.id,
        location.name,
        location.description,
        location.address,
        location.phone,
        location.email,
        location.capacity,
      ]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query updateLocation (${JSON.stringify(location)}), error: ${error}`,
      );
      return false;
    }
  }
}
