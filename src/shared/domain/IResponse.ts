import { ApiProperty } from '@nestjs/swagger';

export class IResponse<T = any> {
  @ApiProperty()
  public error: boolean;
  @ApiProperty()
  public data: T;
  @ApiProperty()
  public message: string;
  @ApiProperty()
  public code: number;
  @ApiProperty()
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
