import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { Channel, Connection, connect } from 'amqplib';
import { rabbitmqConfig } from './rabbitmq.config';

@Injectable()
export class RabbitMQInitializer implements OnApplicationBootstrap {
    // private connection: Connection;
    // private channel: Channel;

  // constructor(private readonly rabbitmqService: RabbitMQService) {}

  async onApplicationBootstrap(): Promise<void> {
    try{
    // this.connection = await connect({
    //     hostname: rabbitmqConfig.hostname,
    //     port: rabbitmqConfig.port,
    //     username: rabbitmqConfig.username,
    //     password: rabbitmqConfig.password,
    //   });
      // this.channel = await this.connection.createChannel();
      Logger.log('RabbitMQ connection is initialized stopped now')
    } catch (error) {
      console.error('An error occurred while connecting to RabbitMQ:', error);
      throw error;
    }
  }
}