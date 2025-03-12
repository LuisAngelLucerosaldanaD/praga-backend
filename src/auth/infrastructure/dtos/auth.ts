import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CredentialsDTO {
  @IsString()
  @ApiProperty()
  username: string;
  @ApiProperty()
  @IsString()
  password: string;
}

export interface Account {
  id: string;
  role: string;
  password: string;
  status: number;
  failed_attempts: number;
  is_block: boolean;
  is_delete: boolean;
}

export class AccountDTO {
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
  birth_date: string;
}
