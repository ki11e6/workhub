import { IEmailLocals, winstonLogger } from '@ki11e6/workhub-helper-library';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import Email from 'email-templates';
import path from 'path';
import { config } from '@notifications/config';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransportHelper-mailerSend', 'debug');
// MailerSend API setup
const mailerSend = new MailerSend({
  apiKey: config.MAILERSEND_API_KEY! // Set your API key in an environment variable
});

// Email Service Function
async function sendMailerSendEmail(template: string, receiver: string, locals: IEmailLocals): Promise<void> {
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

    const sentFrom = new Sender(config.SENDER_EMAIL!, locals.sellerUsername);

    const recipients = [new Recipient(receiver, locals.buyerUsername)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(emailResponse.originalMessage.subject)
      .setHtml(emailResponse.originalMessage.html);

    await mailerSend.email.send(emailParams);

    log.info(`Email sent to ${receiver} successfully`);
  } catch (error) {
    log.error(error);
  }
}

export { sendMailerSendEmail };
