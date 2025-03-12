import { ApiProperty } from '@nestjs/swagger';

export class FilesEventDTO {
  @ApiProperty({ required: false })
  id?: string;
  @ApiProperty()
  typeId: number;
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  fileId: string;
}
