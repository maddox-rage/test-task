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
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/feedbacks')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all feedbacks' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'statusId', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of feedbacks',
  })
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
  @ApiOperation({ summary: 'Get feedback by ID for a user' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns the feedback',
  })
  async getFeedbackById(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Feedback | null> {
    return this.feedbackService.getFeedbackById(id, userId);
  }

  @Get('users/:userId/feedbacks')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all feedbacks for a user' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of feedbacks for the user',
  })
  async getFeedbacksByUserId(
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Feedback[] | null> {
    return this.feedbackService.getFeedbackByUserId(userId);
  }

  @Post('users/:userId/feedbacks')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create feedback for a user' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({
    status: 201,
    description: 'Feedback successfully created',
  })
  async createFeedback(
    @Param('userId', ParseIdPipe) userId: number,
    @Body() feedbackData: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.createFeedback(userId, feedbackData);
  }

  @Put('users/:userId/feedbacks/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update feedback status for a user' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Feedback successfully updated',
  })
  async updateFeedbacksStatus(
    @Param('userId', ParseIdPipe) userId: number,
    @Param('id', ParseIdPipe) id: number,
    @Body() feedbackData: UpdateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.updateFeedbacksStatus(id, feedbackData, userId);
  }

  @Delete('users/:userId/feedbacks/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete feedback for a user' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Feedback successfully deleted',
  })
  async deleteFeedback(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Feedback> {
    return this.feedbackService.deleteFeedback(id, userId);
  }
}
