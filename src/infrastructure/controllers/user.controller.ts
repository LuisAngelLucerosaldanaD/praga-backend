import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from '../database/services/user.service';
import { CreateUserDto } from '../../application/dtos/users/create.dto';
import { User } from '../../domain/entities/user.entity';
import { UserCommand } from '../../application/commands/users/user.command';
import { IResponse } from '../models/IResponse';
import { UpdateDto } from '../../application/dtos/users/update.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  private readonly userCommand: UserCommand;

  constructor(private readonly userRepositoryService: UserService) {
    this.userCommand = new UserCommand(userRepositoryService);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto, @Res() res: Response) {
    const response = await this.userCommand.create(dto);
    if (response.error) {
      return res.status(202).json(response);
    }

    return res.status(201).json(response);
  }

  @Put()
  async updateUser(@Body() dto: UpdateDto, @Res() res: Response) {
    const response = await this.userCommand.update(dto);
    if (response.error) {
      return res.status(202).json(response);
    }

    return res.status(200).json(response);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const response = await this.userCommand.delete(id);
    if (response.error || !response.data) {
      return res.status(202).json(response);
    }

    return res.status(200).json(response);
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res: Response) {
    const response = await this.userCommand.getUserById(id);
    if (response.error) {
      return res.status(202).json(response);
    }

    if (!response.data) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  }

  @Get()
  async getUsers(): Promise<IResponse<User[]>> {
    return this.userCommand.getUsers();
  }
}
