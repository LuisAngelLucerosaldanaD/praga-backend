import { Zone } from './zone';

export interface ZoneRepository {
  createZone(Zone: Zone): Promise<boolean>;

  updateZone(Zone: Zone): Promise<boolean>;

  deleteZone(id: string, user: string): Promise<boolean>;

  getZoneById(id: string): Promise<Zone | null>;

  getZones(): Promise<Zone[]>;
}
