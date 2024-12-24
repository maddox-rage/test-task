import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UpvoteService } from './upvote.service';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('users/:userId/feedbacks/:feedbackId/votes/')
export class UpvoteController {
  constructor(private readonly upvoteService: UpvoteService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get the upvote count for a feedback' })
  @ApiParam({ name: 'feedbackId', description: 'The ID of the feedback' })
  @ApiResponse({
    status: 200,
    description: 'The number of upvotes for the feedback',
  })
  async getUpvoteCount(
    @Param('feedbackId', ParseIdPipe) feedbackId: number,
  ): Promise<number> {
    return this.upvoteService.getUpvoteCount(feedbackId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add an upvote to a feedback' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiParam({ name: 'feedbackId', description: 'The ID of the feedback' })
  @ApiResponse({
    status: 201,
    description: 'Upvote added successfully',
  })
  async addVote(
    @Param('userId', ParseIdPipe) userId: number,
    @Param('feedbackId', ParseIdPipe) feedbackId: number,
  ): Promise<{ message: string }> {
    return this.upvoteService.addVote(userId, feedbackId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove an upvote from a feedback' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiParam({ name: 'feedbackId', description: 'The ID of the feedback' })
  @ApiResponse({
    status: 200,
    description: 'Upvote removed successfully',
  })
  async removeVote(
    @Param('userId', ParseIdPipe) userId: number,
    @Param('feedbackId', ParseIdPipe) feedbackId: number,
  ): Promise<{ message: string }> {
    return this.upvoteService.removeVote(userId, feedbackId);
  }
}
