import { Injectable } from '@nestjs/common';
import { rabbitmqConfig } from './rabbitmq.config';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;

  async connect(): Promise<void> {
    try {
      this.connection = await connect({
        hostname: rabbitmqConfig.hostname,
        port: rabbitmqConfig.port,
        username: rabbitmqConfig.username,
        password: rabbitmqConfig.password,
      });
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(rabbitmqConfig.exchange, 'direct', { durable: true });
      await this.channel.assertQueue(rabbitmqConfig.queue, { durable: true });
      await this.channel.bindQueue(rabbitmqConfig.queue, rabbitmqConfig.exchange, rabbitmqConfig.routingKey);
    } catch (error) {
      console.error('An error occurred while connecting to RabbitMQ:', error);
      throw error;
    }
  }

  async publishMessage(message: string): Promise<void> {
    try {
      if (!this.channel) {
        throw new Error('RabbitMQ channel is not initialized');
      }
      await this.channel.publish(rabbitmqConfig.exchange, rabbitmqConfig.routingKey, Buffer.from(message));
    } catch (error) {
      console.error('An error occurred while publishing a message to RabbitMQ:', error);
      throw error;
    }
  }

  async consumeMessages(callback: (message: string) => void): Promise<void> {
    try {
      if (!this.channel) {
        throw new Error('RabbitMQ channel is not initialized');
      }
      await this.channel.consume(rabbitmqConfig.queue, (msg) => {
        if (msg) {
          const message = msg.content.toString();
          callback(message);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error('An error occurred while consuming messages from RabbitMQ:', error);
      throw error;
    }
  }
}