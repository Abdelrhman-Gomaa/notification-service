import { Injectable } from '@nestjs/common';
import { Notification } from './models/notification.model';
import { SendNotificationInput } from './input/send-notification.input';
import { FindNotificationInput } from './input/find-notification.input';
import { RabbitMQService } from 'src/_common/rabbitmq/rabbitmq.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';


@Injectable()
export class NotificationService {
  constructor(
    private readonly rabbitmqService: RabbitMQService,
  ) { }

  async sendNotification(input: SendNotificationInput) {
    try {
      return await Notification.query().insert(
        {
          userId: input.userId,
          parentId: input.parentId,
          content: input.content,
          thumbnail: input.thumbnail,
          NotifyType: input.NotifyType,
          notifyService: input.notifyService
        });
    } catch (error) {
      console.log('>>>>>>>> sendNotification', error);
      throw error
    }
  }

  async getUserNotifications(input: FindNotificationInput) {
    return await Notification.query().where({ userId: input.modelId });
  }

  async getParentNotifications(input: FindNotificationInput) {
    return await Notification.query().where({ parentId: input.modelId });
  }
}