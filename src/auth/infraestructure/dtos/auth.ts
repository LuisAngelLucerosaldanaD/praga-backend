import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export interface Account {
  id: string;
  role: string;
  password: string;
  status: number;
  is_block: boolean;
  is_delete: boolean;
}

export class AccountDTO {
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
