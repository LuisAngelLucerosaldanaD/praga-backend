import { Body, Controller, HttpStatus, Ip, Post, Res } from '@nestjs/common';
import { Public } from '../../shared/infraestructure/decorators/public.decorator';
import { AccountDTO, CredentialsDTO } from './dtos/auth';
import { Response } from 'express';
import { ApplicationService } from '../application/application.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IResponse } from '../../shared/domain/IResponse';
import { Session } from '../domain/session';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly _appService: ApplicationService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiBody({ type: CredentialsDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login User',
    type: IResponse<Session>,
  })
  async login(
    @Body() dto: CredentialsDTO,
    @Res() res: Response,
    @Ip() ip: string,
  ) {
    const response = await this._appService.login(dto, ip);
    return res.status(response.code).json(response);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiBody({ type: AccountDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Register User',
    type: IResponse,
  })
  async register(@Body() dto: AccountDTO, @Res() res: Response) {
    const response = await this._appService.register(dto);
    return res.status(response.code).json(response);
  }
}
