import { Channel, ConsumeMessage } from 'amqplib';
import { winstonLogger } from '@ki11e6/workhub-helper-library';
import { config } from '@notifications/config';
import { Logger } from 'winston';
import { createConnection } from '@notifications/queues/connection';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationService-emailConsumer', 'debug');

async function consumeAuthEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'workhub-authemail-notification';
    const routingKey = 'auth-email';
    const queueName = 'auth-email-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const workhubQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false
    });
    await channel.bindQueue(workhubQueue.queue, exchangeName, routingKey);
    await channel.consume(workhubQueue.queue, async (msg: ConsumeMessage | null) => {
      console.log(JSON.parse(msg!.content.toString()));
      //TODO: send email
      // channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'Notification-service EmailConsumer consumerAuthEmailMessages() method error ', error);
  }
}

async function consumeOrderEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'workhub-orderemail-notification';
    const routingKey = 'order-email';
    const queueName = 'order-email-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const workhubQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false
    });
    await channel.bindQueue(workhubQueue.queue, exchangeName, routingKey);
    await channel.consume(workhubQueue.queue, async (msg: ConsumeMessage | null) => {
      console.log(JSON.parse(msg!.content.toString()));
      //TODO: send email
      // channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'Notification-service EmailConsumer consumeOrderEmailMessages() method error ', error);
  }
}

export { consumeAuthEmailMessages, consumeOrderEmailMessages };
