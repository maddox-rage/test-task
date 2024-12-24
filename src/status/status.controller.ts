import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all statuses' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all statuses',
    type: [String],
  })
  async getAllStatuses(): Promise<string[]> {
    return this.statusService.getAllStatuses();
  }
}
