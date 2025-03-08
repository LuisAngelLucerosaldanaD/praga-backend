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
import { Response } from 'express';
import { ApplicationService } from '../application/application.service';
import { UserDto } from './dto/dtos';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IResponse } from '../../shared/domain/IResponse';
import { User } from '../domain/user';
import { Ticket } from '../../tickets/domain/ticket';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly _appService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create User',
    type: IResponse,
  })
  async createUser(
    @Body() dto: UserDto,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const response = await this._appService.create(dto, req['user'].id);
    return res.status(response.code).json(response);
  }

  @Put()
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update User',
    type: IResponse,
  })
  async updateUser(@Body() dto: UserDto, @Res() res: Response) {
    const response = await this._appService.update(dto);
    return res.status(response.code).json(response);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete User',
    type: IResponse<User>,
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of User',
  })
  async deleteUser(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const response = await this._appService.delete(id, req['user'].id);
    return res.status(response.code).json(response);
  }

  @Get()
  @ApiOperation({ summary: 'Get Users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Users',
    type: IResponse<User[]>,
  })
  async getUsers(@Res() res: Response) {
    const response = await this._appService.getUsers();
    return res.status(response.code).json(response);
  }

  @Get('/tickets/:user_id')
  @ApiOperation({ summary: 'Get Ticket by user id' })
  @ApiParam({ name: 'user_id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Ticket by user id',
    type: IResponse<Ticket[]>,
  })
  public async getTicketByUserId(
    @Param('user_id') user_id: string,
    @Res() res: Response,
  ) {
    const response = await this._appService.getTicketsByUser(user_id);
    return res.status(response.code).json(response);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get User by id',
    type: IResponse<User>,
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of User',
  })
  async getUser(@Param('id') id: string, @Res() res: Response) {
    const response = await this._appService.getUserById(id);
    return res.status(response.code).json(response);
  }
}
