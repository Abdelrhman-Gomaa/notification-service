import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [DatabaseModule, RabbitmqModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule { }
