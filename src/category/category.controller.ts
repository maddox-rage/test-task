import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCategories(): Promise<string[]> {
    return await this.categoryService.getAllCategories();
  }
}
