import client, { Channel, Connection } from 'amqplib';
import { config } from '@notifications/config';
import { Logger } from 'winston';
import { winstonLogger } from '@ki11e6/workhub-helper-library';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationService-queuesConnection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
  try {
    //created connection
    const connection: Connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    //created channel
    const channel: Channel = await connection.createChannel();
    log.info('Notification server connected to queue successfully...');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'NotificationService error queues createConnection() method:', error);
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: Connection): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection };
