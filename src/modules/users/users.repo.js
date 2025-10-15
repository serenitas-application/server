import { baseRepo } from '#modules/common/base/base.repo.js';

export function usersRepo(db) {
  const repo = db['users'];
  const base = baseRepo(repo);

  async function getUserInfo(userId) {
    return await repo.findUnique({ where: { id: userId } });
  }

  return { ...base, getUserInfo };
}
