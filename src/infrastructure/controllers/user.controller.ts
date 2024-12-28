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
import { UserService } from '../database/services/user.service';
import { CreateUserDto } from '../../application/dtos/users/create.dto';
import { User } from '../../domain/entities/user.entity';
import { UserCommand } from '../../application/commands/users/user.command';
import { IResponse } from '../models/IResponse';
import { UpdateDto } from '../../application/dtos/users/update.dto';
import { Response } from 'express';
import { ICredentials } from '../../application/dtos/auth';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../../application/decorators/public.decorator';

@Controller('users')
export class UsersController {
  private readonly userCommand: UserCommand;

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {
    this.userCommand = new UserCommand(userService, jwtService);
  }

  @Public()
  @Post()
  async createUser(
    @Body() dto: CreateUserDto,
    @Res() res: Response,
    @Request() req: Request,
  ) {
    console.log(req);
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

  @Public()
  @Post('login')
  async login(@Body() dto: ICredentials, @Res() res: Response) {
    const response = await this.userCommand.login(dto);
    if (response.error) {
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    if (!response.data) {
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }
}
