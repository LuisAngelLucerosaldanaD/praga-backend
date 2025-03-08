import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../shared/infraestructure/decorators/public.decorator';
import { ICredentials } from './dtos/auth';
import { Response } from 'express';
import { IResponse } from '../../shared/domain/IResponse';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: ICredentials, @Res() res: Response) {
    const response: IResponse = {
      data: null,
      code: 401,
      error: true,
      message: 'User or password incorrect',
      type: 'Auth',
    };
    const session = await this.authService.login(dto);
    if (!session) {
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    response.code = 200;
    response.error = false;
    response.message = 'Login successfully';
    response.data = session;

    return res.status(HttpStatus.OK).json(response);
  }
}
