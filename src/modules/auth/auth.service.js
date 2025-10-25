import { crypto } from '#common/crypto/crypto.js';
import { AppError, ErrorCode } from '#common/app-error/app-error.js';

export function authService(usersService, mailerService, sessionStore) {
  const mailTokens = new Map();

  async function login(payload) {
    const { email, password, userAgent, ipAddress } = payload;
    const currentUser = await usersService.findByEmail(email);
    if (!currentUser) {
      throw new AppError(
        ErrorCode.INVALID_CREDENTIALS,
        'Wrong email or password',
      );
    }
    const correctPassword = await crypto.verify(currentUser.password, password);
    if (!correctPassword) {
      throw new AppError(
        ErrorCode.INVALID_CREDENTIALS,
        'Wrong email or password',
      );
    }

    const maxAge = sessionStore.getSessionAgeInSeconds();
    const sessionId = await sessionStore.create({
      userId: currentUser.id,
      userAgent,
      ipAddress,
      loginDate: new Date(),
    });

    return { sessionId, maxAge };
  }

  async function registration(payload) {
    const { email, username, password } = payload;
    const registratedUser = await usersService.findByEmail(email);
    if (registratedUser) {
      throw new AppError(ErrorCode.CONFLICT, 'Current account already exist');
    }

    const hashPassword = await crypto.hash(password);
    const result = await usersService.create({
      email,
      password: hashPassword,
      username,
    });

    return { id: result.id };
  }

  async function sendToken({ email, lang }) {
    const registratedUser = await usersService.findByEmail(email);
    if (registratedUser) {
      throw new AppError(ErrorCode.CONFLICT, 'Current account already exist');
    }

    await mailTokens.delete(email);

    const token = crypto.generateToken(16);
    const hashedToken = await crypto.hash(token);

    await mailTokens.set(email, hashedToken);
    await mailerService.sendVerifyMail({ email, token }, lang);
  }

  async function verifyToken({ email, token }) {
    const storageToken = await mailTokens.get(email);
    const isTokenValid = await crypto.verify(storageToken, token);

    if (!isTokenValid) {
      throw new AppError(
        ErrorCode.INVALID_STATE,
        'Wrong email code, please try again',
      );
    }

    await mailTokens.delete(email);
    return true;
  }

  async function logout(sessionId) {
    await sessionStore.delete(sessionId);
  }

  return { login, registration, logout, sendToken, verifyToken };
}
