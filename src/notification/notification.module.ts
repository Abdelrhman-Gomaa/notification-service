import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { RabbitmqModule } from 'src/_common/rabbitmq/rabbitmq.module';
import { DatabaseModule } from 'src/_common/database/database.module';

@Module({
  imports: [DatabaseModule, RabbitmqModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
  ],
  exports: [
    NotificationService,
  ]
})
export class NotificationModule { }
