import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateFeedbackDto } from './dto/CreateFeedback.dto';
import { Feedback } from '@prisma/client';
import { UpdateFeedbackDto } from './dto/UpdateFeedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}
  async createFeedback(
    userId: number,
    dto: CreateFeedbackDto,
  ): Promise<Feedback> {
    return await this.prisma.feedback.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: {
          connect: {
            id: dto.categoryId,
          },
        },
        status: {
          connect: {
            id: dto.statusId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  async getFeedbackById(feedbackId: number, userId: number): Promise<Feedback> {
    await this.userService.getUserById(userId);
    const feedback = await this.prisma.feedback.findUnique({
      where: {
        id: feedbackId,
      },
    });
    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }
    return feedback;
  }
  async getFeedbackByUserId(userId: number): Promise<Feedback[]> {
    await this.userService.getUserById(userId);
    const feedbacks = await this.prisma.feedback.findMany({
      where: {
        authorId: userId,
      },
    });
    if (!feedbacks || feedbacks.length === 0) {
      throw new NotFoundException('Feedbacks not found');
    }
    return feedbacks;
  }
  async updateFeedbacksStatus(
    feedbackId: number,
    dto: UpdateFeedbackDto,
    userId: number,
  ): Promise<Feedback> {
    await this.getFeedbackById(feedbackId, userId);
    return await this.prisma.feedback.update({
      where: {
        id: feedbackId,
      },
      data: {
        status: {
          connect: {
            id: dto.statusId,
          },
        },
      },
    });
  }
  async deleteFeedback(feedbackId: number, userId: number): Promise<Feedback> {
    await this.getFeedbackById(feedbackId, userId);
    return this.prisma.feedback.delete({
      where: {
        id: feedbackId,
      },
    });
  }
}
