import { baseRepo } from '#modules/common/base/base.repo.js';

export function mailerRepo({ db, handleDatabaseError }) {
  const repo = db['emailVerifyToken'];
  const base = baseRepo(repo, handleDatabaseError);

  async function findToken(token) {
    return await repo
      .findUnique({ where: { token } })
      .catch((err) => handleDatabaseError(err));
  }

  return { ...base, findToken };
}
