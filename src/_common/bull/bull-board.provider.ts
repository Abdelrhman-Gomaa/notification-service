import { ExpressAdapter } from '@bull-board/express';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Injectable()
export class QueueUIProvider {
  static router = null;
  constructor(
    @InjectQueue('notification') private readonly notificationQueue: Queue,    
  ) {
    const serverAdapter = new ExpressAdapter().setBasePath('/admin/queues');
    createBullBoard({
      queues: [
        new BullAdapter(this.notificationQueue),
      ],
      serverAdapter: serverAdapter
    });
    QueueUIProvider.router = serverAdapter.getRouter();
  }
}
