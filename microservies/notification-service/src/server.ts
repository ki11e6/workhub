import { Application } from 'express';
import { Logger } from 'winston';
import { winstonLogger } from '@ki11e6/workhub-helper-library';
import http from 'http';
import 'express-async-errors';
import { healthRoutes } from '@notifications/routes';
import { config } from '@notifications/config';
import { checkConnection } from '@notifications/elasticsearch';

const SERVER_PORT = 4001;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationService-server', 'debug');

export function start(app: Application): void {
  startServer(app);
  app.use('', healthRoutes());
  startQueues();
  startElasticSearch();
}

async function startQueues(): Promise<void> {
  try {
  } catch (error) {
    log.log('error', 'Notification-service startQueues() method: ', error);
  }
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
