import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [FeedbackController],
  providers: [FeedbackService, PrismaService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
