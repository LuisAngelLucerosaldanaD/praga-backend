import { ApiProperty } from '@nestjs/swagger';

export class PlaceDTO {
  @ApiProperty({ required: false })
  id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  event_id: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  slots: number;
  @ApiProperty()
  stock: number;
  @ApiProperty()
  pre_sale_price: number;
}
