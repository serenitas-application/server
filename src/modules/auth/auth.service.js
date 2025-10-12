import { crypto } from '#common/crypto/crypto.js';
import { AppError, ErrorCode } from '#common/app-error/app-error.js';

export function authService(userService, sessionStore) {
  async function login(payload) {
    const { email, password, userAgent, ipAddress } = payload;
    const currentUser = await userService.findByEmail(email);
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

    const sessionId = await sessionStore.create({
      userId: currentUser.id,
      userAgent,
      ipAddress,
      loginDate: new Date(),
    });

    return sessionId;
  }

  async function registration(payload) {
    const { email, username, password } = payload;
    const registratedUser = await userService.findByEmail(email);
    if (registratedUser) {
      throw new AppError(ErrorCode.CONFLICT, 'Current account already exist');
    }

    const hashPassword = await crypto.hash(password);
    const result = await userService.create({
      email,
      password: hashPassword,
      username,
    });
    return { id: result.id };
  }

  async function logout(sessionId) {
    await sessionStore.delete(sessionId);
  }

  return { login, registration, logout };
}
