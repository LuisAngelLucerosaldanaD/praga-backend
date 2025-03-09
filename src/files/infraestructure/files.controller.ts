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
import { ApplicationService } from '../application/application.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IResponse } from '../../shared/domain/IResponse';
import { FileDTO } from './dtos/dtos';
import { Response } from 'express';
import { File } from '../domain/file';

@ApiBearerAuth()
@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly _appService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create File' })
  @ApiBody({ type: FileDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create File',
    type: IResponse,
  })
  public async createFile(
    @Body() dto: FileDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.createFile(dto, user);
    return res.status(response.code).json(response);
  }

  @Put()
  @ApiOperation({ summary: 'Update File' })
  @ApiBody({ type: FileDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update File',
    type: IResponse,
  })
  public async updateFile(
    @Body() dto: FileDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.updateFile(dto, user);
    return res.status(response.code).json(response);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete File' })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of File',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete File',
    type: IResponse,
  })
  public async deleteFile(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req['user'].id;
    const response = await this._appService.deleteFile(id, user);
    return res.status(response.code).json(response);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Files' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get All Files',
    type: IResponse<File[]>,
  })
  public async getFiles(@Res() res: Response) {
    const response = await this._appService.getFiles();
    return res.status(response.code).json(response);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get File by Id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get File by Id',
    type: IResponse<File>,
  })
  public async getFileById(@Param('id') id: string, @Res() res: Response) {
    const response = await this._appService.getFileById(id);
    return res.status(response.code).json(response);
  }
}
