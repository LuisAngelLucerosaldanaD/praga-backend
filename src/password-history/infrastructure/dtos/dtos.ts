import { ApiProperty } from '@nestjs/swagger';

export class PasswordHistoryDTO {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty()
  password: string;
}
