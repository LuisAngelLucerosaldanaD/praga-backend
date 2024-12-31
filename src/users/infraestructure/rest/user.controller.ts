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
import { Response } from 'express';
import { Public } from '../../../shared/infraestructure/decorators/public.decorator';
import { UserCommand } from '../../application/commands/user.command';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create.dto';
import { UpdateDto } from '../dto/update.dto';
import { IResponse } from '../../../shared/domain/IResponse';
import { User } from '../../domain/user';

@Controller('users')
export class UsersController {
  private readonly userCommand: UserCommand;

  constructor(private readonly userService: UserService) {
    this.userCommand = new UserCommand(userService);
  }

  @Public()
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
