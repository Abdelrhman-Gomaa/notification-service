import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { RabbitmqModule } from 'src/_common/rabbitmq/rabbitmq.module';
import { NotificationProcessor } from './notification.processor';
import { DatabaseModule } from 'src/_common/database/database.module';

@Module({
  imports: [DatabaseModule, RabbitmqModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationProcessor,
  ],
  exports: [
    NotificationService,
    NotificationProcessor
  ]
})
export class NotificationModule { }
