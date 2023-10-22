import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from 'src/_common/rabbitmq/rabbitmq.service';
import { Notification } from 'src/notification/models/notification.model';

@Injectable()
export class MailConsumerService implements OnModuleInit {
	private isConnected: boolean = false;
	constructor(private readonly rabbitmqService: RabbitMQService) { }

	onModuleInit(): void {
		this.startConsuming();
	}

	async startConsuming(): Promise<void> {
		try {
			await this.rabbitmqService.connect();
			this.isConnected = true;
			// let notificationPayload
			await this.rabbitmqService.consumeMessages('mail_notifications_queue', async (message) => {
				const msg = JSON.parse(message)
				await Notification.query().insert(
					{
						userId: msg?.userId,
						parentId: msg?.parentId,
						content: msg?.content,
						thumbnail: msg?.thumbnail,
						NotifyType: msg?.NotifyType,
						notifyService: 'mail_notifications_queue'
					});
				console.log('>>>>>>>> ', msg.content);
			});
		} catch (error) {
			console.log('>>>>>>>> startConsuming', error);
			this.isConnected = false;
			setTimeout(() => this.startConsuming(), 5000);
			// throw error
		}
	}
}