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
import { EventsApplication } from '../../application/evenst.application';
import { ICreateEvent, IUpdateEvent } from '../dtos/crud';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Controller('api/v1/events')
export class EventController {
  constructor(private readonly eventsApplication: EventsApplication) {}

  @Post()
  public async createEvent(
    @Body() event: ICreateEvent,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    event.id = event.id ? event.id : uuidv4();
    const response = await this.eventsApplication.createEvent(event, user);
    if (response.error) {
      return res.status(response.code).json(response);
    }
    return res.status(HttpStatus.CREATED).json(response);
  }

  @Get()
  public async getEvents(@Res() res: Response) {
    const response = await this.eventsApplication.getEvents();
    if (response.error) {
      return res.status(response.code).json(response);
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Get(':id')
  public async getEventById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.eventsApplication.getEventById(id);
    if (response.error) {
      return res.status(response.code).json(response);
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Put()
  public async updateEvent(@Body() event: IUpdateEvent, @Res() res: Response) {
    const response = await this.eventsApplication.updateEvent(event);
    if (response.error) {
      return res.status(response.code).json(response);
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Delete(':id')
  public async deleteEvent(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this.eventsApplication.deleteEvent(id, user);
    if (response.error) {
      return res.status(response.code).json(response);
    }
    return res.status(HttpStatus.OK).json(response);
  }
}
