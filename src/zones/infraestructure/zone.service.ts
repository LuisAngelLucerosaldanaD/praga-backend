import { Injectable, Logger } from '@nestjs/common';
import { ZoneRepository } from '../domain/zone.repository';
import { Zone } from '../domain/zone.entity';
import { DatabaseService } from '../../shared/infraestructure/persistence/database.service';

@Injectable()
export class ZoneService implements ZoneRepository {
  private readonly logger = new Logger(ZoneService.name);

  constructor(private readonly dbService: DatabaseService) {}

  createZone(Zone: Zone): Promise<boolean> {
    return Promise.resolve(false);
  }

  deleteZone(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  getZoneById(id: string): Promise<Zone | null> {
    return Promise.resolve(undefined);
  }

  getZones(): Promise<Zone[]> {
    return Promise.resolve([]);
  }

  updateZone(Zone: Zone): Promise<boolean> {
    return Promise.resolve(false);
  }

}