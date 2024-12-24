import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FeedbackModule } from './feedback/feedback.module';
import { UpvoteModule } from './upvote/upvote.module';
import { StatusModule } from './status/status.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, UserModule, FeedbackModule, UpvoteModule, StatusModule, CategoryModule],
})
export class AppModule {}
