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
import { LoggedUserDTO } from './dtos/dtos';
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
import { LoggedUser } from '../domain/logged_user';

@ApiBearerAuth()
@ApiTags('LoggedUser')
@Controller('api/v1/logged_user')
export class LoggedUsersController {
  constructor(private readonly _appService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create LoggedUser' })
  @ApiBody({ type: LoggedUserDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create LoggedUser',
    type: IResponse,
  })
  public async createLoggedUser(
    @Body() dto: LoggedUserDTO,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.createLoggedUser(dto, user);
    return res.status(response.code).json(response);
  }

  @Get()
  @ApiOperation({ summary: 'Get LoggedUsers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get LoggedUsers',
    type: IResponse<LoggedUser[]>,
  })
  public async getLoggedUsers(@Res() res: Response) {
    const response = await this._appService.getLoggedUsers();
    return res.status(response.code).json(response);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get LoggedUser by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get LoggedUser by id',
    type: IResponse<LoggedUser>,
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of LoggedUser',
  })
  public async getLoggedUserById(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const response = await this._appService.getLoggedUserById(id);
    return res.status(response.code).json(response);
  }

  @Put()
  @ApiOperation({ summary: 'Update LoggedUser' })
  @ApiBody({ type: LoggedUserDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update LoggedUser',
    type: IResponse,
  })
  public async updateLoggedUser(
    @Body() dto: LoggedUserDTO,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.updateLoggedUser(dto, user);
    return res.status(response.code).json(response);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete LoggedUser by id' })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of logged_user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete logged_user by id',
    type: IResponse<LoggedUser>,
  })
  public async deleteLoggedUser(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.deleteLoggedUser(id, user);
    return res.status(response.code).json(response);
  }
}
