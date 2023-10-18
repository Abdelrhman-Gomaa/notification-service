import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Notification } from './models/notification.model';
import { SendNotificationInput } from './input/send-notification.input';
import { FindNotificationInput } from './input/find-notification.input';


@Injectable()
export class NotificationService {
  constructor(
    @InjectKnex() private readonly knex: Knex
  ) { }

  async sendNotification(input: SendNotificationInput) {
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

  async checkNotification() {
    if (!await this.knex.schema.hasTable('notifications')) {
      await this.knex.schema.createTable('notifications', table => {
        table.increments('id').primary();
        table.integer('userId').notNullable();
        table.integer('parentId').notNullable();
        table.string('content').notNullable();
        table.string('thumbnail').nullable();
        table.string('NotifyType').nullable();
        table.timestamps(true, true);
      });
    }
  }

}