import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories(): Promise<string[]> {
    const categories = await this.prisma.category.findMany({
      select: {
        name: true,
      },
    });
    return categories.map((status) => status.name);
  }
}
