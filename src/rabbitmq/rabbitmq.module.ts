import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQInitializer } from './tabbitmq.intializer';
@Module({
  providers: [RabbitMQService, RabbitMQInitializer],
  exports: [RabbitMQService]
})
export class RabbitmqModule { }
