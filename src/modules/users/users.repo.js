import { baseRepo } from '#modules/common/base/base.repo.js';

export function usersRepo(db) {
  const repo = db['user'];
  const base = baseRepo(repo);

  async function getUserInfo(userId) {
    return await repo.findUnique({ where: { id: userId } });
  }

  async function findByEmail(email) {
    return await base.findOneByField('email', email);
  }

  return { ...base, getUserInfo, findByEmail };
}
