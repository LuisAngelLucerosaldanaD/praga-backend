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
import { PasswordHistoryDTO } from './dtos/dtos';
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
import { PasswordHistory } from '../domain/password_history';

@ApiBearerAuth()
@ApiTags('PasswordHistory')
@Controller('api/v1/password-history')
export class PasswordHistoryController {
  constructor(private readonly _appService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create Password History' })
  @ApiBody({ type: PasswordHistoryDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create Password History',
    type: IResponse,
  })
  public async createPasswordHistory(
    @Body() dto: PasswordHistoryDTO,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.createPasswordHistory(dto, user);
    return res.status(response.code).json(response);
  }

  @Get()
  @ApiOperation({ summary: 'Get Passwords History' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Passwords History',
    type: IResponse<PasswordHistory[]>,
  })
  public async getPasswordsHistory(@Res() res: Response) {
    const response = await this._appService.getPasswordsHistory();
    return res.status(response.code).json(response);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Password History by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get PasswordHistory by id',
    type: IResponse<PasswordHistory>,
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of Password History',
  })
  public async getPasswordHistoryById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const response = await this._appService.getPasswordHistoryById(id);
    return res.status(response.code).json(response);
  }

  @Put()
  @ApiOperation({ summary: 'Update Password History' })
  @ApiBody({ type: PasswordHistoryDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Password History',
    type: IResponse,
  })
  public async updatePasswordHistory(
    @Body() dto: PasswordHistoryDTO,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.updatePasswordHistory(dto, user);
    return res.status(response.code).json(response);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Password History by id' })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of Password History',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete Password History by id',
    type: IResponse<PasswordHistory>,
  })
  public async deletePasswordHistory(
    @Param('id') id: number,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.deletePasswordHistory(id, user);
    return res.status(response.code).json(response);
  }
}
