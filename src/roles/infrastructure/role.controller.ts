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
  UseGuards,
} from '@nestjs/common';
import { RoleDTO } from './dtos/role';
import { Response } from 'express';
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
import { Role } from '../domain/role';
import { AdminGuard } from '../../shared/infrastructure/guards/admin.guard';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('api/v1/roles')
export class RoleController {
  constructor(private readonly _appService: ApplicationService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create Role' })
  @ApiBody({ type: RoleDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create Role',
    type: IResponse,
  })
  public async createRole(
    @Body() dto: RoleDTO,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const user = req['user'].id;
    const response = await this._appService.create(dto, user);
    return res.status(response.code).json(response);
  }

  @Put()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update Role' })
  @ApiBody({ type: RoleDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Role',
    type: IResponse,
  })
  public async updateRole(@Body() dto: RoleDTO, @Res() res: Response) {
    const response = await this._appService.update(dto);
    return res.status(response.code).json(response);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete Role' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete Role',
    type: IResponse,
  })
  public async deleteRole(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const response = await this._appService.delete(id, req['user'].id);
    return res.status(response.code).json(response);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get Role by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Role by id',
    type: IResponse<Role>,
  })
  public async getRole(@Param('id') id: string, @Res() res: Response) {
    const response = await this._appService.getRoleById(id);
    return res.status(response.code).json(response);
  }

  @Get()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get Roles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Roles',
    type: IResponse<Role[]>,
  })
  public async getRoles(@Res() res: Response) {
    const response = await this._appService.getRoles();
    return res.status(response.code).json(response);
  }
}
