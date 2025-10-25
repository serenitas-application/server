import { readFileAsync } from '#common/file.js';

export function mailerService(mailer, logger) {
  async function sendVerifyMail(payload, lang = 'en') {
    const fileName = `welcome-${lang}.html`;

    return await sendMail(fileName, payload);
  }

  async function sendMail(fileName, payload) {
    let template = await readFileAsync('src/static', fileName).catch((err) => {
      logger.error(err);
      return null;
    });
    template = template.replace(/{{token}}/g, payload.token);

    const mailObj = {
      from: 'Serenitas',
      to: payload.email,
      subject: 'Your Serenitas journey starts here ✨',
      html: template,
    };

    return await mailer.sendMail(mailObj);
  }

  return { sendVerifyMail };
}
