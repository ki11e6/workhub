import { winstonLogger } from '@ki11e6/workhub-helper-library';
import { Logger } from 'winston';
import { config } from '@notifications/config';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

//shared library logger
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationService-elasticsearch', 'debug');

//Elasticsearch client with credentials
const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}` //credentials included
});

//check connection to elasticsearch cluster and log status
export async function checkConnection(): Promise<void> {
  let isConnected = false;
  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({}); //green,yellow,red
      log.info(`NotificationService ElastiSearch health status - ${health.status}`);
      isConnected = true; //only when status is green or yellow
    } catch (error) {
      log.error('Connection to ElasticSearch failed. Retrying in 5 seconds...');
      log.log('error', 'Notification-service ElastiSearch checkConnection() method: ', error);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}
