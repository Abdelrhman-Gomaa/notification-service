import { Module } from '@nestjs/common';
import { RabbitmqModule } from 'src/_common/rabbitmq/rabbitmq.module';
import { MailConsumerService } from './mail-consumer.service';

@Module({
	imports: [RabbitmqModule],
	providers: [
		MailConsumerService
	],
	exports: [
		MailConsumerService,
	]
})
export class ConsumersModule { }
