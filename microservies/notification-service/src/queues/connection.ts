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
    // setupCloseOnExit(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'NotificationService error queues createConnection() method:', error);
    // throw new Error('Could not establish connection to RabbitMQ.');
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: Connection): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

// function setupCloseOnExit(channel: Channel, connection: Connection): void {
//   process.once('SIGINT', async () => {
//     log.info('SIGINT received. Closing RabbitMQ resources...');
//     await closeResources(channel, connection);
//     process.exit(0);
//   });

//   process.once('SIGTERM', async () => {
//     log.info('SIGTERM received. Closing RabbitMQ resources...');
//     await closeResources(channel, connection);
//     process.exit(0);
//   });
// }

// async function closeResources(channel: Channel, connection: Connection): Promise<void> {
//   try {
//     await channel.close();
//     await connection.close();
//     log.info('RabbitMQ channel and connection closed successfully.');
//   } catch (error) {
//     log.error('Error while closing RabbitMQ resources:', error);
//   }
// }
export { createConnection };
