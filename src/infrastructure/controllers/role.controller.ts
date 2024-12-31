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
import { RoleCommand } from '../../application/commands/users/role.command';
import { RoleService } from '../database/services/role.service';
import { ICreateRoleDto, IUpdateDto } from '../../application/dtos/role';
import { Response } from 'express';

@Controller('roles')
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
    console.log(req['user']);
    const response = await this.roleCommand.create(dto);
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
  async deleteRole(@Param('id') id: string, @Res() res: Response) {
    const response = await this.roleCommand.delete(id);
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
