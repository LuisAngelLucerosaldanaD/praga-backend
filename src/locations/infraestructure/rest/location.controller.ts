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
import { LocationApplication } from '../../application/location.application';
import { ICreateLocationDto, IUpdateLocationDto } from '../dtos/crud';
import { v4 as uuidV4 } from 'uuid';
import { Response } from 'express';

@Controller('api/v1/locations')
export class LocationController {
  constructor(private readonly locationApplication: LocationApplication) {}

  @Post()
  public async createLocation(
    @Body() data: ICreateLocationDto,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    data.id = data.id ? data.id : uuidV4();
    const response = await this.locationApplication.createLocation(data, user);
    if (response.error) {
      return res.status(response.code).json(response);
    }

    return res.status(HttpStatus.CREATED).json(response);
  }

  @Put()
  public async updateLocation(
    @Body() data: IUpdateLocationDto,
    @Res() res: Response,
  ) {
    const response = await this.locationApplication.updateLocation(data);
    if (response.error) {
      return res.status(response.code).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }

  @Delete(':id')
  public async deleteLocation(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this.locationApplication.deleteLocation(id, user);
    if (response.error) {
      return res.status(response.code).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }

  @Get(':id')
  public async getLocation(@Param('id') id: string, @Res() res: Response) {
    const response = await this.locationApplication.getLocationById(id);
    if (response.error) {
      return res.status(response.code).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }

  @Get()
  public async getLocations(@Res() res: Response) {
    const response = await this.locationApplication.getLocations();
    if (response.error) {
      return res.status(response.code).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }
}
