import { Zone } from '../entities/zone.entity';

export interface ZoneRepository {
  createZone(Zone: Zone): Promise<boolean>;

  updateZone(Zone: Zone): Promise<boolean>;

  deleteZone(id: string): Promise<boolean>;

  getZoneById(id: string): Promise<Zone | null>;

  getZones(): Promise<Zone[]>;
}
