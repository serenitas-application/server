import { AppError, ErrorCode } from '#common/app-error/app-error.js';
import { crypto } from '#common/crypto/crypto.js';
import { readFileAsync } from '#common/file.js';

export function mailerService(repo, mailer, logger, origin) {
  const EXPIRE_TIME = 24 * 3600 * 1000; // 24h
  const VERIFY_API_PATH = '/api/auth/verify-email';
  const MAIL_FROM = 'Serenitas';

  async function sendVerifyMail(email, userId, lang = 'en') {
    const fileName = `welcome-${lang}.html`;
    const token = crypto.getRandomId();
    const expiresAt = new Date(Date.now() + EXPIRE_TIME);

    await saveVerifyToken({
      userId,
      token,
      expiresAt,
    });

    const verifyUrl = new URL(VERIFY_API_PATH, origin);
    verifyUrl.searchParams.set('token', token);

    let template = await readFileAsync('src/static', fileName).catch((err) => {
      logger.error(err);
      return null;
    });
    template = template.replace(/{{verifyUrl}}/g, verifyUrl);

    const mailObj = {
      from: MAIL_FROM,
      to: email,
      subject: 'Your Serenitas journey starts here ✨',
      html: template,
    };

    return await mailer.sendMail(mailObj);
  }

  async function saveVerifyToken(payload) {
    return await repo.create(payload);
  }

  async function validateToken(token) {
    const currentDate = new Date().toISOString();
    const tokenInfo = await repo.findToken(token);
    if (!tokenInfo || tokenInfo?.createdAt < currentDate) {
      throw new AppError(
        ErrorCode.INVALID_STATE,
        'Verification token has expired. Please request a new one. ',
      );
    }

    await repo.deleteOne(tokenInfo.id);
    return tokenInfo.userId;
  }

  return { sendVerifyMail, validateToken };
}
