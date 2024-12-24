import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllStatuses(): Promise<string[]> {
    return this.statusService.getAllStatuses();
  }
}
