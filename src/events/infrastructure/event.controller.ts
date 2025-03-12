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
import { ApplicationService } from '../application/application.service';
import { EventDTO } from './dtos/dtos';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IResponse } from '../../shared/domain/IResponse';
import { Event } from '../domain/event';
import { Place } from '../../places/domain/place';

@ApiBearerAuth()
@ApiTags('Events')
@Controller('api/v1/events')
export class EventController {
  constructor(private readonly _appService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create Event' })
  @ApiBody({ type: EventDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create Event',
    type: IResponse,
  })
  public async createEvent(
    @Body() event: EventDTO,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.createEvent(event, user);
    return res.status(response.code).json(response);
  }

  @Get()
  @ApiOperation({ summary: 'Get Events' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Events',
    type: IResponse<Event[]>,
  })
  public async getEvents(@Res() res: Response) {
    const response = await this._appService.getEvents();
    return res.status(response.code).json(response);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Event by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Event by id',
    type: IResponse<EventDTO>,
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of Event',
  })
  public async getEventById(@Param('id') id: string, @Res() res: Response) {
    const response = await this._appService.getEventById(id);
    return res.status(response.code).json(response);
  }

  @Put()
  @ApiOperation({ summary: 'Update Event' })
  @ApiBody({ type: EventDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Event',
    type: IResponse,
  })
  public async updateEvent(@Body() event: EventDTO, @Res() res: Response) {
    const response = await this._appService.updateEvent(event);
    return res.status(response.code).json(response);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Event by id' })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of Event',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete Event by id',
    type: IResponse<Event>,
  })
  public async deleteEvent(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.deleteEvent(id, user);
    return res.status(response.code).json(response);
  }

  @Get('/places/:event_id')
  @ApiOperation({ summary: 'Get Event Place by event id' })
  @ApiParam({
    name: 'event_id',
    type: 'uuid',
    description: 'Id of event',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Event Place by event id',
    type: IResponse<Place[]>,
  })
  public async getPlaceByEventID(
    @Param('event_id') event_id: string,
    @Res() res: Response,
  ) {
    const response = await this._appService.getPlacesEvent(event_id);
    return res.status(response.code).json(response);
  }
}
