import path from 'path';
import Email from 'email-templates';
import sgMail from '@sendgrid/mail';
import { config } from '@notifications/config';
import { Logger } from 'winston';
import { IEmailLocals, winstonLogger } from '@ki11e6/workhub-helper-library';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransportHelper', 'debug');

// Set up SendGrid API Key
sgMail.setApiKey(config.SENDGRID_API_KEY!);

// Email Service Function
async function sendEmail(template: string, receiver: string, locals: IEmailLocals): Promise<void> {
  try {
    // Initialize the Email instance
    const email = new Email({
      message: {
        from: `Workhub App <${config.SENDGRID_FROM_EMAIL}>`
      },
      send: true,
      preview: false,
      transport: {
        jsonTransport: true // Render email without sending (required for SendGrid)
      },
      views: {
        options: {
          extension: 'ejs' // Or pug, handlebars, etc.
        }
      },
      juice: true, // Inlines CSS
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, '../build')
        }
      }
    });

    // Render the email
    const emailResponse = await email.send({
      template: path.join(__dirname, '..', 'src/emails', template),
      message: { to: receiver },
      locals
    });

    // Use SendGrid to send the rendered email
    const { html, subject } = emailResponse;
    const msg = {
      to: receiver,
      from: process.env.SENDGRID_FROM_EMAIL || 'no-reply@workhub.com',
      subject,
      html // HTML content from email-templates
    };

    await sgMail.send(msg);
    log.info(`Email sent to ${receiver} successfully`);
  } catch (error) {
    log.error(error);
  }
}

export { sendEmail };
