import { Module } from '@nestjs/common';
import { UpvoteService } from './upvote.service';
import { UpvoteController } from './upvote.controller';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [FeedbackModule, AuthModule],
  controllers: [UpvoteController],
  providers: [UpvoteService, PrismaService],
  exports: [UpvoteService],
})
export class UpvoteModule {}
