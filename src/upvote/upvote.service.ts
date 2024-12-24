import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Upvote } from '@prisma/client';
import { FeedbackService } from 'src/feedback/feedback.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UpvoteService {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly prisma: PrismaService,
  ) {}
  async addVote(
    userId: number,
    feedbackId: number,
  ): Promise<{ message: string }> {
    await this.feedbackService.getFeedbackById(feedbackId, userId);
    const upvote = await this.getVote(userId, feedbackId);
    if (upvote) {
      throw new HttpException('vote already exists', HttpStatus.BAD_REQUEST);
    }
    await this.prisma.upvote.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        feedback: {
          connect: {
            id: feedbackId,
          },
        },
      },
    });
    return { message: 'You voted' };
  }

  async getVote(userId: number, feedbackId: number): Promise<Upvote> {
    return await this.prisma.upvote.findUnique({
      where: { userId_feedbackId: { userId, feedbackId } },
    });
  }

  async removeVote(
    userId: number,
    feedbackId: number,
  ): Promise<{ message: string }> {
    await this.feedbackService.getFeedbackById(feedbackId, userId);
    const upvote = await this.getVote(userId, feedbackId);
    if (!upvote) {
      throw new NotFoundException('vote not found');
    }
    if (upvote.userId !== userId) {
      throw new ForbiddenException('You cannot delete this vote');
    }
    await this.prisma.upvote.delete({
      where: { userId_feedbackId: { userId, feedbackId } },
    });
    return { message: 'You deleted your vote' };
  }

  async getUpvoteCount(feedbackId: number): Promise<number> {
    return this.prisma.upvote.count({
      where: { feedbackId },
    });
  }
}
