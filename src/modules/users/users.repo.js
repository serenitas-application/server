import { baseRepo } from '#modules/common/base/base.repo.js';

export function usersRepo({ db, handleDatabaseError }) {
  const repo = db['user'];
  const base = baseRepo(repo);

  async function getUserInfo(userId) {
    return await repo
      .findUniqueOrThrow({ where: { id: userId } })
      .catch((e) => handleDatabaseError(e));
  }

  async function findByEmail(email) {
    return await base
      .findOneByField('email', email)
      .catch((e) => handleDatabaseError(e));
  }

  return { ...base, getUserInfo, findByEmail };
}
