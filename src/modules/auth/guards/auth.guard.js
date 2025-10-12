import { AppError, ErrorCode } from '#common/app-error/app-error.js';
import { AUTH_SESSION_COOKIE_NAME } from '../consts/index.js';

export function authGuard(sessionStore) {
  async function check(req) {
    const sessionId = req.cookies[AUTH_SESSION_COOKIE_NAME];
    if (!sessionId) {
      throw new AppError(ErrorCode.INVALID_CREDENTIALS, 'Unauthorized');
    }

    const session = await sessionStore.get(sessionId);

    if (!session) {
      throw new AppError(ErrorCode.INVALID_CREDENTIALS, 'Unauthorized');
    }

    req.session = { userId: Number(session.userId), sessionId };
  }

  return { check };
}
