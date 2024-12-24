import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [AuthModule, UserModule, FeedbackModule],
})
export class AppModule {}
