import winston, { Logger } from 'winston';
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
  LogData,
  TransformedData,
} from 'winston-elasticsearch';

//transform winston data to elasticsearch data
const esTransformer = (logData: LogData): TransformedData => {
  return ElasticsearchTransformer(logData);
};
//winston logger for elasticsearch and console
export const winstonLogger = (
  elasticsearchNode: string,
  name: string,
  level: string
): Logger => {
  //Transport options
  const options = {
    console: {
      level,
      handleExceptions: true,
      json: false,
      colorize: true,
    },
    elasticsearch: {
      level,
      transformer: esTransformer,
      clientOpts: {
        node: elasticsearchNode,
        log: level,
        maxRetries: 2,
        requestTimeout: 10000,
        sniffOnStart: false,
      },
    },
  };
  //Elasticsearch transport
  const esTransport: ElasticsearchTransport = new ElasticsearchTransport(
    options.elasticsearch
  );
  //Logger creation with console and elasticsearch transports
  const logger: Logger = winston.createLogger({
    exitOnError: false,
    defaultMeta: { service: name },
    transports: [new winston.transports.Console(options.console), esTransport],
  });
  return logger;
};
