import { ApiProperty } from '@nestjs/swagger';

export class FileDTO {
  @ApiProperty({ required: false })
  id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  format: string;
  @ApiProperty()
  hash: string;
  @ApiProperty()
  size: number;
}
