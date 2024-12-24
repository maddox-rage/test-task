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

  async getAllFeedbacks({
    categoryId,
    statusId,
    sortBy = 'createdAt',
    order = 'desc',
    page = 1,
    limit = 10,
  }: {
    categoryId?: number;
    statusId?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }): Promise<{ feedbacks: Feedback[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    const where = {
      ...(categoryId ? { categoryId } : {}),
      ...(statusId ? { statusId } : {}),
    };

    const orderBy =
      sortBy === 'votes' ? { upvote: { _count: order } } : { [sortBy]: order };

    const [feedbacks, totalCount] = await this.prisma.$transaction([
      this.prisma.feedback.findMany({
        where,
        include: {
          _count: {
            select: {
              upvote: true,
            },
          },
          category: true,
          status: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.feedback.count({ where }),
    ]);

    return { feedbacks, totalCount };
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
