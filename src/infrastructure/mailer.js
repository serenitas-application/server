import { Resend } from 'resend';

export function mailerProvider(config, log) {
  const resend = new Resend(config.api);

  async function sendMail(params) {
    const { data, error } = await resend.emails.send({
      from: 'Serenitas <no-reply@resend.dev>',
      to: params.to,
      subject: params.subject,
      html: params.html ?? undefined,
      text: params.text ?? undefined,
    });

    if (error) {
      log.error(JSON.stringify(error));
      throw new Error(JSON.stringify(error));
    }

    return data;
  }

  return { sendMail };
}
