import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ required: false })
  id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  document: string;
  @ApiProperty()
  type_document: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  cellphone: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  points: number;
  @ApiProperty()
  status: number;
  @ApiProperty()
  role: string;
  @ApiProperty()
  birth_date: string;
}
