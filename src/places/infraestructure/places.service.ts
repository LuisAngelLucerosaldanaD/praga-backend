import { Injectable, Logger } from '@nestjs/common';
import { PlacesRepository } from '../domain/places.repository';
import { DatabaseService } from '../../shared/infraestructure/persistence/database.service';
import { Place } from '../domain/place';

@Injectable()
export class PlacesService implements PlacesRepository {
  private readonly logger = new Logger(PlacesService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async createPlace(place: Place): Promise<boolean> {
    this.logger.debug(
      `Executing query: createPlace (${JSON.stringify(place)})`,
    );
    const query = `insert into config.places (id, name, description, event_id, price, slots, stock, pre_sale_price,
                                                     user_creator)
                   values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    try {
      await this.dbService.execute(query, [
        place.id,
        place.name,
        place.description,
        place.event_id,
        place.price,
        place.slots,
        place.stock,
        place.pre_sale_price,
        place.user_creator,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createPlace (${JSON.stringify(place)}), error: ${error}`,
      );
      return false;
    }
  }

  public async updatePlace(place: Place): Promise<boolean> {
    this.logger.debug(
      `Executing query: updatePlace (${JSON.stringify(place)})`,
    );
    const query = `update config.places
                   set name           = $2,
                       description    = $3,
                       event_id       = $4,
                       price          = $5,
                       slots          = $6,
                       stock          = $7,
                       pre_sale_price = $8,
                       updated_at     = now()
                   where id = $1`;
    try {
      await this.dbService.execute(query, [
        place.id,
        place.name,
        place.description,
        place.event_id,
        place.price,
        place.slots,
        place.stock,
        place.pre_sale_price,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query updatePlace (${JSON.stringify(place)}), error: ${error}`,
      );
      return false;
    }
  }

  public async deletePlace(id: string, user: string): Promise<boolean> {
    this.logger.debug(`Executing query: deletePlace (${id})`);
    const query = `update config.places
                   set is_delete    = true,
                       deleted_at   = now(),
                       user_deleter = $2
                   where id = $1`;
    try {
      const res = await this.dbService.execute(query, [id, user]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deletePlace (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getPlaceById(id: string): Promise<Place | null> {
    this.logger.debug(`Executing query: getPlaceById (${id})`);
    const query = `select id,
                          name,
                          description,
                          event_id,
                          price,
                          slots,
                          stock,
                          pre_sale_price,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_deleted,
                          user_creator,
                          user_deleter
                   from config.places
                   where id = $1
                     and is_deleted = false`;
    try {
      const res = await this.dbService.execute(query, [id]);
      if (res.rowCount === 0) return null;
      return Place.parseQuery(res.rows[0]);
    } catch (error) {
      this.logger.error(
        `Error executing query getPlaceById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getPlacesByEventId(event_id: string): Promise<Place[]> {
    this.logger.debug(`Executing query: getPlacesByEventId (${event_id})`);
    const query = `select id,
                          name,
                          description,
                          event_id,
                          price,
                          slots,
                          stock,
                          pre_sale_price,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_deleted,
                          user_creator,
                          user_deleter
                   from config.places
                   where event_id = $1
                     and is_deleted = false`;
    try {
      const res = await this.dbService.execute(query, [event_id]);
      return res.rows.map((row) => Place.parseQuery(row));
    } catch (error) {
      this.logger.error(
        `Error executing query getPlacesByEventId (${event_id}), error: ${error}`,
      );
      return [];
    }
  }

  public async getPlaces(): Promise<Place[]> {
    this.logger.debug(`Executing query: getPlaces`);
    const query = `select id,
                          name,
                          description,
                          event_id,
                          price,
                          slots,
                          stock,
                          pre_sale_price,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_deleted,
                          user_creator,
                          user_deleter
                   from config.places
                   where is_deleted = false`;
    try {
      const res = await this.dbService.execute(query);
      return res.rows.map((row) => Place.parseQuery(row));
    } catch (error) {
      this.logger.error(`Error executing query getPlaces, error: ${error}`);
      return [];
    }
  }
}
