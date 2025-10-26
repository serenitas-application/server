import { readFileAsync } from '#common/file.js';

export function mailerService(mailer, logger) {
  async function sendWelcomeMail(payload, lang = 'en') {
    const fileName = `welcome-${lang}.html`;

    let template = await readFileAsync('src/static', fileName).catch((err) => {
      logger.error(err);
      return null;
    });
    template = template.replace(/{{username}}/g, payload.username);

    const mailObj = {
      to: payload.email,
      subject: 'Your Serenitas journey starts here ✨',
      html: template,
    };

    return await mailer.sendMail(mailObj);
  }

  async function sendVerifyMail(payload, lang = 'en') {
    const fileName = `verify-${lang}.html`;

    let template = await readFileAsync('src/static', fileName).catch((err) => {
      logger.error(err);
      return null;
    });
    template = template.replace(/{{token}}/g, payload.token);

    const mailObj = {
      to: payload.email,
      subject: 'Your Serenitas confirmation code is inside ✨',
      html: template,
    };

    return await mailer.sendMail(mailObj);
  }

  return { sendVerifyMail, sendWelcomeMail };
}
