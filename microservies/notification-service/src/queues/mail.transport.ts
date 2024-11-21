import { config } from '@notifications/config';
import { emailTemplates } from '@notifications/helpers';
import { IEmailLocals, winstonLogger } from '@ki11e6/workhub-helper-library';
import { Logger } from 'winston';
import { sendGridEmail } from '@notifications/sendgrid';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransport', 'debug');

async function sendEmail(template: string, receiverEmail: string, locals: IEmailLocals): Promise<void> {
  try {
    config.NODE_ENV === 'production'
      ? await sendGridEmail(template, receiverEmail, locals)
      : await emailTemplates(template, receiverEmail, locals);
    log.info('Email sent successfully.');
  } catch (error) {
    log.log('error', 'NotificationService MailTransport sendEmail() method error:', error);
  }
}

export { sendEmail };
