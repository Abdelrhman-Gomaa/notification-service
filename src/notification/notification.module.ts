import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { NotificationProcessor } from './notification.processor';

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
