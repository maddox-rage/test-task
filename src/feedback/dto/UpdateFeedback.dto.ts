import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateFeedbackDto {
  @ApiProperty({
    description: 'The ID of the new status for the feedback',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  statusId: number;
}
