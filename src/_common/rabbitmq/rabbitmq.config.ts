export const rabbitmqConfig = {
  hostname: 'localhost',
  port: 5672,
  username: 'guest',
  password: 'guest',
  exchange: 'notifications_exchange',
  queues: [
    { name: 'mail_notifications_queue', routingKey: 'otp' },
    { name: 'Mobile_sms_queue', routingKey: 'sms' }
  ],
};