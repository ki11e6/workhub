import { Application } from 'express';
import { Logger } from 'winston';
import { winstonLogger } from '@ki11e6/workhub-helper-library';
import http from 'http';
import { Channel } from 'amqplib';
import 'express-async-errors';
import { healthRoutes } from '@notifications/routes';
import { config } from '@notifications/config';
import { checkConnection } from '@notifications/elasticsearch';
import { createConnection } from '@notifications/queues/connection';
import { consumeOrderEmailMessages, consumeAuthEmailMessages } from '@notifications/queues/email.consumer';

const SERVER_PORT = 4001;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationService-server', 'debug');

export function start(app: Application): void {
  startServer(app);
  app.use('', healthRoutes());
  startQueues();
  startElasticSearch();
}

async function startQueues(): Promise<void> {
  const emailChannel: Channel = (await createConnection()) as Channel;
  await consumeAuthEmailMessages(emailChannel);
  await consumeOrderEmailMessages(emailChannel);
  //test email queue
  await emailChannel.assertExchange('workhub-authemail-notification', 'direct');
  const message = JSON.stringify({
    subject: 'Welcome to Workhub',
    body: 'You have successfully created your account',
    from: 'Workhub',
    to: 'l3WzF@example.com'
  });
  emailChannel.publish('workhub-authemail-notification', 'auth-email', Buffer.from(message));

  //test order queue
  await emailChannel.assertExchange('workhub-orderemail-notification', 'direct');
  const orderMessage = JSON.stringify({
    subject: 'New Order',
    body: 'You have a new order',
    from: 'Workhub',
    to: 'l3WzF@example.com'
  });
  emailChannel.publish('workhub-orderemail-notification', 'order-email', Buffer.from(orderMessage));
}

function startElasticSearch(): void {
  checkConnection();
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(`Worker with process id of ${process.pid} on notification server has started`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification serrver is running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log('error', 'Notification-service startServer() method: ', error);
  }
}
