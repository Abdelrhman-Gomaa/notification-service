import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationInput } from './input/send-notification.input';
import { Response } from 'express';
import { FindNotificationInput } from './input/find-notification.input';

@Controller('notify')
export class NotificationController {
  constructor(private notificationService: NotificationService) { }

  @Post('/sendNotification')
  async sendNotification(@Body() input: SendNotificationInput, @Res() res: Response): Promise<Response> {
    try {
      const notification = await this.notificationService.sendNotification(input);
      return res.status(201).json({ notification });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }

  @Get('/parentNotification')
  async getParentNotifications(@Body() input: FindNotificationInput, @Res() res: Response): Promise<Response> {
    try {
      const notification = await this.notificationService.getParentNotifications(input);
      return res.status(201).json({ notification });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }

  @Get('/userNotification')
  async getUserNotifications(@Body() input: FindNotificationInput, @Res() res: Response): Promise<Response> {
    try {
      const notification = await this.notificationService.getUserNotifications(input);
      return res.status(201).json({ notification });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }
}