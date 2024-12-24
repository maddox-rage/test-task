import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from '@prisma/client';
import { CreateFeedbackDto } from './dto/CreateFeedback.dto';
import { UpdateFeedbackDto } from './dto/UpdateFeedback.dto';

@Controller('users/:userId/feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}
  @Get(':id')
  async getFeedbackById(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ): Promise<Feedback | null> {
    return this.feedbackService.getFeedbackById(Number(id), Number(userId));
  }
  @Get()
  async getFeedbacksByUserId(
    @Param('userId') userId: number,
  ): Promise<Feedback[] | null> {
    return this.feedbackService.getFeedbackByUserId(Number(userId));
  }
  @Post()
  async createFeedback(
    @Param('userId') userId: number,
    @Body() feedbackData: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.createFeedback(Number(userId), feedbackData);
  }
  @Put(':id')
  async updateFeedbacksStatus(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() feedbackData: UpdateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.updateFeedbacksStatus(
      Number(id),
      feedbackData,
      Number(userId),
    );
  }
  @Delete(':id')
  async deleteFeedback(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ): Promise<Feedback> {
    return this.feedbackService.deleteFeedback(Number(id), Number(userId));
  }
}
