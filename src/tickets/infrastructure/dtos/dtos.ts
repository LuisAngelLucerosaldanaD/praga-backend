import { ApiProperty } from '@nestjs/swagger';

export class TicketDTO {
  @ApiProperty({ required: false })
  id?: string;
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  place_id: string;
  @ApiProperty()
  transaction_id: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  status: number;
  @ApiProperty()
  promoter_code: string;
}
