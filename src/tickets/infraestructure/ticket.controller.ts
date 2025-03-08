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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IResponse } from '../../shared/domain/IResponse';
import { TicketDTO } from './dtos/dtos';
import { Response } from 'express';
import { Ticket } from '../domain/ticket';

@ApiBearerAuth()
@ApiTags('Tickets')
@Controller('api/v1/tickets')
export class TicketController {
  constructor(private readonly _appService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create Ticket' })
  @ApiBody({ type: TicketDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create Ticket',
    type: IResponse,
  })
  public async createTicket(
    @Body() dto: TicketDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.createTicket(dto, user);
    return res.status(response.code).json(response);
  }

  @Put()
  @ApiOperation({ summary: 'Update Ticket' })
  @ApiBody({ type: TicketDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Ticket',
    type: IResponse,
  })
  public async updateTicket(
    @Body() dto: TicketDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.updateTicket(dto, user);
    return res.status(response.code).json(response);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Ticket' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete Ticket',
    type: IResponse,
  })
  public async deleteTicket(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.deleteTicket(id, user);
    return res.status(response.code).json(response);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Ticket by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Ticket by id',
    type: IResponse<Ticket>,
  })
  public async getTicketById(@Param('id') id: string, @Res() res: Response) {
    const response = await this._appService.getTicketById(id);
    return res.status(response.code).json(response);
  }

  @Get('')
  @ApiOperation({ summary: 'Get Tickets' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Tickets',
    type: IResponse<Ticket[]>,
  })
  public async getTickets(@Res() res: Response) {
    const response = await this._appService.getTickets();
    return res.status(response.code).json(response);
  }
}
