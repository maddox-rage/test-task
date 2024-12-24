import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UpvoteService } from './upvote.service';

@Controller('users/:userId/feedbacks/:feedbackId/votes/')
export class UpvoteController {
  constructor(private readonly upvoteService: UpvoteService) {}

  @Get()
  async getUpvoteCount(
    @Param('feedbackId') feedbackId: number,
  ): Promise<number> {
    return this.upvoteService.getUpvoteCount(Number(feedbackId));
  }

  @Post()
  async addVote(
    @Param('userId') userId: number,
    @Param('feedbackId') feedbackId: number,
  ): Promise<{ message: string }> {
    return this.upvoteService.addVote(Number(userId), Number(feedbackId));
  }

  @Delete()
  async removeVote(
    @Param('userId') userId: number,
    @Param('feedbackId') feedbackId: number,
  ): Promise<{ message: string }> {
    return this.upvoteService.removeVote(Number(userId), Number(feedbackId));
  }
}
