import { AppError, ErrorCode } from '#common/app-error/app-error.js';

export function userService(repo) {
  async function getUserInfo(userId) {
    return await repo.getUserInfo(userId);
  }

  async function create(payload) {
    const user = await repo.create(payload);
    return user;
  }

  async function findByEmail(email) {
    return await repo.findByEmail(email);
  }

  async function verifyAccount(userId) {
    const user = await repo.findOneById(userId);
    if (!user) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Current user doesn`t exist');
    }
    await repo.update(userId, { ...user, verified: true });
    return true;
  }

  return { create, findByEmail, getUserInfo, verifyAccount };
}
