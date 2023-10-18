import { Injectable } from '@nestjs/common';
import { rabbitmqConfig } from './rabbitmq.config';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;

  async connect(queue: string , routingKey): Promise<void> {
    try {
      this.connection = await connect({
        hostname: rabbitmqConfig.hostname,
        port: rabbitmqConfig.port,
        username: rabbitmqConfig.username,
        password: rabbitmqConfig.password,
      });
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(rabbitmqConfig.exchange, 'direct', { durable: true });
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.bindQueue(queue, rabbitmqConfig.exchange, routingKey);
    } catch (error) {
      console.error('An error occurred while connecting to RabbitMQ:', error);
      throw error;
    }
  }

  async publishMessage(message: string, routingKey): Promise<void> {
    try {
      if (!this.channel) {
        throw new Error('RabbitMQ channel is not initialized');
      }
      await this.channel.publish(rabbitmqConfig.exchange, routingKey, Buffer.from(message));
    } catch (error) {
      console.error('An error occurred while publishing a message to RabbitMQ:', error);
      throw error;
    }
  }

  async consumeMessages(queue: string,callback: (message: string) => void): Promise<void> {
    try {
      if (!this.channel) {
        throw new Error('RabbitMQ channel is not initialized');
      }
      await this.channel.consume(queue, (msg) => {
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