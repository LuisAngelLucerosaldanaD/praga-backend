import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
} from '@nestjs/common';
import { ZonesApplication } from '../../application/zones.application';
import { ICreateZoneDTO, IUpdateZoneDTO } from '../dtos/crud';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';

@Controller('api/v1/zones')
export class ZoneController {
  constructor(private readonly zonesApplication: ZonesApplication) {}

  @Post()
  public async createZone(
    @Body() zone: ICreateZoneDTO,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    zone.id = zone.id ? zone.id : uuidv4();
    const response = await this.zonesApplication.createZone(zone, user);
    if (response.error) {
      return res.status(response.code).json(response);
    }

    return res.status(HttpStatus.CREATED).json(response);
  }

  @Get()
  public async getZones(@Res() res: Response) {
    const response = await this.zonesApplication.getZones();
    if (response.error) {
      return res.status(response.code).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }

  @Get(':id')
  public async getZoneById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.zonesApplication.getZoneById(id);
    if (response.error) {
      return res.status(response.code).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }

  @Put()
  public async updateZone(@Body() zone: IUpdateZoneDTO, @Res() res: Response) {
    const response = await this.zonesApplication.updateZone(zone);
    if (response.error) {
      return res.status(response.code).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }

  @Delete(':id')
  public async deleteZone(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this.zonesApplication.deleteZone(id, user);
    if (response.error) {
      return res.status(response.code).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }
}
