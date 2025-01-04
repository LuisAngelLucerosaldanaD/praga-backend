import { Injectable, Logger } from '@nestjs/common';
import { ZoneRepository } from '../domain/zone.repository';
import { Zone } from '../domain/zone';
import { DatabaseService } from '../../shared/infraestructure/persistence/database.service';

@Injectable()
export class ZonesService implements ZoneRepository {
  private readonly logger = new Logger(ZonesService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async createZone(Zone: Zone): Promise<boolean> {
    this.logger.debug(`Executing query: createZone (${JSON.stringify(Zone)})`);
    const query = `INSERT INTO config.zones (id, name, description, type, location_id, user_creator)
                   VALUES ($1, $2, $3, $4, $5, $6)`;

    try {
      await this.dbService.execute(query, [
        Zone.id,
        Zone.name,
        Zone.description,
        Zone.type,
        Zone.location_id,
        Zone.user_creator,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createZone (${JSON.stringify(Zone)}), error: ${error}`,
      );
      return false;
    }
  }

  public async deleteZone(id: string, user: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteZone (${id})`);
    const query = `UPDATE config.zones
                   set is_delete    = true,
                       deleted_at   = now(),
                       user_deleter = $2
                   WHERE id = $1`;

    try {
      const res = await this.dbService.execute(query, [id, user]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteZone (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getZoneById(id: string): Promise<Zone | null> {
    this.logger.debug(`Executing query: getZoneById (${id})`);
    const query = `SELECT id,
                          name,
                          description,
                          type,
                          location_id,
                          created_at,
                          updated_at,
                          is_delete,
                          deleted_at,
                          user_deleter,
                          user_creator
                   FROM config.zones
                   WHERE id = $1
                     and is_delete = false`;

    try {
      const res = await this.dbService.execute(query, [id]);
      return res.rows[0];
    } catch (error) {
      this.logger.error(
        `Error executing query getZoneById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getZones(): Promise<Zone[]> {
    this.logger.debug(`Executing query: getZones`);
    const query = `SELECT id,
                          name,
                          description,
                          type,
                          location_id,
                          created_at,
                          updated_at,
                          is_delete,
                          deleted_at,
                          user_deleter,
                          user_creator
                   FROM config.zones
                   WHERE is_delete = false`;

    try {
      const res = await this.dbService.execute(query, []);
      return res.rows;
    } catch (error) {
      this.logger.error(`Error executing query getZones, error: ${error}`);
      return [];
    }
  }

  public async updateZone(Zone: Zone): Promise<boolean> {
    this.logger.debug(`Executing query: updateZone (${JSON.stringify(Zone)})`);
    const query = `UPDATE config.zones
                   set name        = $2,
                       description = $3,
                       type        = $4,
                       updated_at  = now()
                   WHERE id = $1`;

    try {
      const res = await this.dbService.execute(query, [
        Zone.id,
        Zone.name,
        Zone.description,
        Zone.type,
      ]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query updateZone (${JSON.stringify(Zone)}), error: ${error}`,
      );
      return false;
    }
  }
}
