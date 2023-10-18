export const rabbitmqConfig = {
  hostname: 'localhost',
  port: 5672,
  username: 'guest',
  password: 'guest',
  exchange: 'notifications_exchange',
  queue: 'notifications_queue',
  routingKey: 'notifications',
};