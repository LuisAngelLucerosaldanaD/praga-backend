import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserRepositoryService } from '../database/services/user.repository.service';
import { CreateUserDto } from '../../application/dtos/users/create.dto';
import { User } from '../../domain/entities/user.entity';
import { UserCommand } from '../../application/commands/users/user.command';
import { Response } from '../models/response';

@Controller('users')
export class UsersController {
  private readonly userCommand: UserCommand;

  constructor(private readonly userRepositoryService: UserRepositoryService) {
    this.userCommand = new UserCommand(userRepositoryService);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<Response<User>> {
    return this.userCommand.create(dto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<Response<User | null>> {
    return this.userCommand.getUserById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<Response<boolean>> {
    return this.userCommand.delete(id);
  }
}
