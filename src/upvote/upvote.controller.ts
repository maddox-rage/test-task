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

@Controller('users/:userId/feedbacks/:feedbackId/votes/')
export class UpvoteController {
  constructor(private readonly upvoteService: UpvoteService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUpvoteCount(
    @Param('feedbackId', ParseIdPipe) feedbackId: number,
  ): Promise<number> {
    return this.upvoteService.getUpvoteCount(feedbackId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addVote(
    @Param('userId', ParseIdPipe) userId: number,
    @Param('feedbackId', ParseIdPipe) feedbackId: number,
  ): Promise<{ message: string }> {
    return this.upvoteService.addVote(userId, feedbackId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async removeVote(
    @Param('userId', ParseIdPipe) userId: number,
    @Param('feedbackId', ParseIdPipe) feedbackId: number,
  ): Promise<{ message: string }> {
    return this.upvoteService.removeVote(userId, feedbackId);
  }
}
