import { ApiProperty } from '@nestjs/swagger';

export interface ICreateRoleDto {
  id?: string;
  name: string;
  description: string;
}

export interface IUpdateDto {
  id: string;
  name: string;
  description: string;
}

export class RoleDTO {
  @ApiProperty({ required: false })
  id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
