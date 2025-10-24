import nodemailer from 'nodemailer';

export function mailerProvider(config, log) {
  const transport = nodemailer.createTransport({
    host: config.host,
    port: Number(config.port),
    secure: true,
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
      html: params.html ? params.content : undefined,
      text: params.html ? undefined : params.content,
    };

    const result = await transport
      .sendMail(mail)
      .catch((err) => handleError(err));

    return result?.messageId;
  }

  function handleError(error) {
    log.error(error);
  }

  return { sendMail };
}
