import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserDTO {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  ipRequest: string;
  @ApiProperty()
  coordinates: string;
}
