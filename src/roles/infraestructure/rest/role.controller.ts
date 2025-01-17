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
import { RoleCommand } from '../../application/commads/role.command';
import { RoleService } from '../role.service';
import { ICreateRoleDto, IUpdateDto } from '../dtos/role';
import { Response } from 'express';

@Controller('api/v1/roles')
export class RoleController {
  private readonly roleCommand: RoleCommand;

  constructor(private readonly roleService: RoleService) {
    this.roleCommand = new RoleCommand(roleService);
  }

  @Post()
  async createRole(
    @Body() dto: ICreateRoleDto,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const response = await this.roleCommand.create(dto, req['user'].id);
    if (response.error) {
      return res.status(HttpStatus.ACCEPTED).json(response);
    }

    return res.status(HttpStatus.CREATED).json(response);
  }

  @Put()
  async updateRole(@Body() dto: IUpdateDto, @Res() res: Response) {
    const response = await this.roleCommand.update(dto);
    if (response.error) {
      return res.status(HttpStatus.ACCEPTED).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }

  @Delete(':id')
  async deleteRole(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    const response = await this.roleCommand.delete(id, req['user'].id);
    if (response.error || !response.data) {
      return res.status(HttpStatus.ACCEPTED).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }

  @Get(':id')
  async getRole(@Param('id') id: string, @Res() res: Response) {
    const response = await this.roleCommand.getRoleById(id);
    if (response.error) {
      return res.status(HttpStatus.ACCEPTED).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }

  @Get()
  async getRoles(@Res() res: Response) {
    const response = await this.roleCommand.getRoles();
    if (response.error) {
      return res.status(HttpStatus.ACCEPTED).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }
}
