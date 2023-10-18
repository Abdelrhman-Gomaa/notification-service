import { InjectQueue, OnGlobalQueueActive, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { NotificationService } from './notification.service';
import { SendNotificationInput } from './input/send-notification.input';

@Processor('notification')
export class NotificationProcessor {
  constructor(
    @InjectQueue('notification') private readonly notificationQueue: Queue,
    private readonly notificationService: NotificationService
  ) { }

  @Process('notificationJob')
  async handle(job: Job) {
    console.log('-------- notificationBoardJob Handler --------');
    const input: SendNotificationInput = job.data;
    return await this.process(input);
  }

  @OnQueueActive()
  async onQueueActive(job: Job) {
    console.log('-------- notificationJob onQueueActive --------');
    const input: SendNotificationInput = job?.data;
    if (input && !(await job?.finished()))
      await this.process(input);
  }

  @OnGlobalQueueActive()
  async onGlobalQueueActive(jobId: string) {
    console.log('-------- notificationJob OnGlobalQueueActive --------');
    const job = await this.notificationQueue.getJob(jobId);
    const input: SendNotificationInput = job?.data;
    if (input && !(await job?.finished()))
      await this.process(input);
  }

  private async process(input: SendNotificationInput) {
    const jobCase = {
      statusChanged: false
    };
    console.log('-------- notificationBoardJob process --------');
    try {
      await this.notificationService.sendNotification(input);
      jobCase.statusChanged = true;
    } catch (error) {
      console.log('Error -> ', error, 'notificationBoardJob');
    } finally {
      return jobCase.statusChanged;
    }
  }
}
