import { Channel, ConsumeMessage } from 'amqplib';
import { winstonLogger } from '@ki11e6/workhub-helper-library';
import { config } from '@notifications/config';
import { Logger } from 'winston';
import { createConnection } from '@notifications/queues/connection';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationService-emailConsumer', 'debug');

async function consumerAuthEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'workhub-email-notification';
    const routingKey = 'auth.email';
    const queueName = 'auth-email-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const workhubQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false
    });
    await channel.bindQueue(workhubQueue.queue, exchangeName, routingKey);
    await channel.consume(workhubQueue.queue, async (msg: ConsumeMessage | null) => {
      console.log(JSON.parse(msg!.content.toString()));
      //TODO: send email,acknowledge message
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'Notification-service EmailConsumer consumerAuthEmailMessages() method error ', error);
  }
}

export { consumerAuthEmailMessages };
