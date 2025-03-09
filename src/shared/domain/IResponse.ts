import { ApiProperty } from '@nestjs/swagger';

export class IResponse<T = any> {
  @ApiProperty({ example: false, type: 'boolean' })
  public error: boolean;
  @ApiProperty({ example: 'The data is dynamic' })
  public data: T;
  @ApiProperty({ example: 'Process successfully' })
  public message: string;
  @ApiProperty({ example: 200, type: 'number' })
  public code: number;
  @ApiProperty({ example: 'Auth', type: 'string' })
  public type: string;

  constructor(
    error: boolean,
    data: T,
    message: string,
    code: number,
    type: string,
  ) {
    this.error = error;
    this.data = data;
    this.message = message;
    this.code = code;
    this.type = type;
  }
}
