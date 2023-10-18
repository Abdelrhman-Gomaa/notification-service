import { Injectable } from '@nestjs/common';
import { Notification } from './models/notification.model';
import { SendNotificationInput } from './input/send-notification.input';
import { FindNotificationInput } from './input/find-notification.input';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';


@Injectable()
export class NotificationService {
  constructor(private readonly rabbitmqService: RabbitMQService) { }


  async sendNotification(input: SendNotificationInput) {
    await this.rabbitmqService.connect();
    await this.rabbitmqService.publishMessage(input.content);
    return await Notification.query().insert(
      {
        userId: input.userId,
        parentId: input.parentId,
        content: input.content,
        thumbnail: input.thumbnail,
        NotifyType: input.NotifyType
      });
  }

  async getUserNotifications(input: FindNotificationInput) {
    return await Notification.query().where({ userId: input.modelId });
  }

  async getParentNotifications(input: FindNotificationInput) {
    return await Notification.query().where({ parentId: input.modelId });
  }
}