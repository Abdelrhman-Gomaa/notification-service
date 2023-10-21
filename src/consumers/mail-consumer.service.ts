import { Injectable, OnModuleInit } from '@nestjs/common';
import { rabbitmqConfig } from 'src/_common/rabbitmq/rabbitmq.config';
import { RabbitMQService } from 'src/_common/rabbitmq/rabbitmq.service';

@Injectable()
export class MailConsumerService implements OnModuleInit {
	private isConnected: boolean = false;
	constructor(private readonly rabbitmqService: RabbitMQService) { }

	onModuleInit(): void {
		// console.log('>>>>>>>>>>>');

		this.startConsuming();
	}

	async startConsuming(): Promise<void> {
		try {
			await this.rabbitmqService.connect();
			this.isConnected = true;
			await this.rabbitmqService.consumeMessages('mail_notifications_queue', (message) => {
				console.log('>>>>>>>>>>>>>>>>>>', 'Received notification:', message);
			});
		} catch (error) {
			console.log('>>>>>>>> startConsuming', error);
			this.isConnected = false;
			setTimeout(() => this.startConsuming(), 5000);
			// throw error
		}
	}
}