import { ApiProperty } from '@nestjs/swagger';

export class EventDTO {
  @ApiProperty({ required: false })
  id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  slogan: string;
  @ApiProperty()
  capacity: number;
  @ApiProperty()
  start_date: string;
  @ApiProperty()
  end_date: string;
  @ApiProperty()
  publication_date: string;
  @ApiProperty()
  pre_sale_date: string;
  @ApiProperty()
  free_list_date: string;
}
