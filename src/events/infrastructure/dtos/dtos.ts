import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDateString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EventDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @MaxLength(100)
  @IsString()
  name: string;

  @ApiProperty()
  @MaxLength(100)
  @IsString()
  slogan: string;

  @ApiProperty()
  @Min(1)
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsDateString()
  start_date: string;

  @ApiProperty()
  @IsDateString()
  end_date: string;

  @ApiProperty()
  @IsDateString()
  publication_date: string;

  @ApiProperty()
  @IsDateString()
  pre_sale_date: string;

  @ApiProperty()
  @IsDateString()
  free_list_date: string;

  @ApiProperty({ type: 'array' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImgDTO)
  images: ImgDTO[];
}

export class ImgDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  file: string;

  @ApiProperty()
  @IsNumber()
  type: number;
}
