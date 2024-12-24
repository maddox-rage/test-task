import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from '@prisma/client';
import { CreateFeedbackDto } from './dto/CreateFeedback.dto';
import { UpdateFeedbackDto } from './dto/UpdateFeedback.dto';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';

@Controller('')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('feedbacks')
  @UseGuards(JwtAuthGuard)
  async getAllFeedbacks(
    @Query('categoryId', ParseIdPipe) categoryId?: number,
    @Query('statusId', ParseIdPipe) statusId?: number,
    @Query('sortBy') sortBy = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'desc',
    @Query('page', ParseIdPipe) page: number = 1,
    @Query('limit', ParseIdPipe) limit: number = 10,
  ) {
    return this.feedbackService.getAllFeedbacks({
      categoryId: categoryId ? categoryId : undefined,
      statusId: statusId ? statusId : undefined,
      sortBy,
      order,
      page: page,
      limit: limit,
    });
  }

  @Get('users/:userId/feedbacks/:id')
  @UseGuards(JwtAuthGuard)
  async getFeedbackById(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Feedback | null> {
    return this.feedbackService.getFeedbackById(id, userId);
  }

  @Get('users/:userId/feedbacks')
  @UseGuards(JwtAuthGuard)
  async getFeedbacksByUserId(
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Feedback[] | null> {
    return this.feedbackService.getFeedbackByUserId(userId);
  }

  @Post('users/:userId/feedbacks')
  @UseGuards(JwtAuthGuard)
  async createFeedback(
    @Param('userId', ParseIdPipe) userId: number,
    @Body() feedbackData: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.createFeedback(userId, feedbackData);
  }

  @Put('users/:userId/feedbacks/:id')
  @UseGuards(JwtAuthGuard)
  async updateFeedbacksStatus(
    @Param('userId', ParseIdPipe) userId: number,
    @Param('id', ParseIdPipe) id: number,
    @Body() feedbackData: UpdateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.updateFeedbacksStatus(id, feedbackData, userId);
  }

  @Delete('users/:userId/feedbacks/:id')
  @UseGuards(JwtAuthGuard)
  async deleteFeedback(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Feedback> {
    return this.feedbackService.deleteFeedback(id, userId);
  }
}
