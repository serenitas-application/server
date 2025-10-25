import { AppError, ErrorCode } from '#common/app-error/app-error.js';
import nodemailer from 'nodemailer';

export function mailerProvider(config, log) {
  const transport = nodemailer.createTransport({
    host: config.host,
    port: Number(config.port),
    secure: false,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  async function sendMail(params) {
    const mail = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      html: params.html ?? undefined,
      text: params.text ?? undefined,
    };

    const result = await transport
      .sendMail(mail)
      .catch((err) => handleError(err));

    return result?.messageId;
  }

  function handleError(error) {
    log.error(error);
    if (error?.message === 'No recipients defined') {
      throw new AppError(
        ErrorCode.INVALID_STATE,
        'Email address not specified',
      );
    }
  }

  return { sendMail };
}
