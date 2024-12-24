import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatusService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllStatuses(): Promise<string[]> {
    const statuses = await this.prisma.status.findMany({
      select: {
        name: true,
      },
    });
    return statuses.map((status) => status.name);
  }
}
