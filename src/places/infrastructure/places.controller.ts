import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApplicationService } from '../applications/application.service';
import { Response } from 'express';
import { PlaceDTO } from './dtos/dtos';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IResponse } from '../../shared/domain/IResponse';
import { Place } from '../domain/place';
import { Ticket } from '../../tickets/domain/ticket';

@ApiBearerAuth()
@ApiTags('Places')
@Controller('api/v1/places')
export class PlacesController {
  constructor(private readonly _appService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create Event Place' })
  @ApiBody({ type: PlaceDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create Event Place',
    type: IResponse,
  })
  public async createPlace(
    @Body() dto: PlaceDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.createPlace(dto, user);
    return res.status(response.code).json(response);
  }

  @Put()
  @ApiOperation({ summary: 'Update Event Place' })
  @ApiBody({ type: PlaceDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Event Place',
    type: IResponse,
  })
  public async updatePlace(@Body() dto: PlaceDTO, @Res() res: Response) {
    const response = await this._appService.updatePlace(dto);
    return res.status(response.code).json(response);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Event Place' })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of Place',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete Event Place',
    type: IResponse<Place>,
  })
  public async deletePlace(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req['user'].id;
    const response = await this._appService.deletePlace(id, user);
    return res.status(response.code).json(response);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Event Places' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get All Event Places',
    type: IResponse<Place[]>,
  })
  public async getPlaces(@Res() res: Response) {
    const response = await this._appService.getPlaces();
    return res.status(response.code).json(response);
  }

  @Get('/tickets/:place_id')
  @ApiOperation({ summary: 'Get Ticket by place id' })
  @ApiParam({ name: 'place_id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Ticket by place id',
    type: IResponse<Ticket[]>,
  })
  public async getTicketByPlaceId(
    @Param('place_id') place_id: string,
    @Res() res: Response,
  ) {
    const response = await this._appService.getTicketsPlace(place_id);
    return res.status(response.code).json(response);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Event Place by id' })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of Place',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Event Place',
    type: IResponse<Place>,
  })
  public async getPlaceByID(@Param('id') id: string, @Res() res: Response) {
    const response = await this._appService.getPlaceById(id);
    return res.status(response.code).json(response);
  }
}
