import { baseRepo } from '#modules/common/base/base.repo.js';

export function usersRepo({ db, handleDatabaseError }) {
  const repo = db['user'];
  const base = baseRepo(repo, handleDatabaseError);

  async function getUserInfo(userId) {
    try {
      const user = await db.$queryRaw`
        SELECT id, email, username, created_date AS "createdDate"
        FROM users
        WHERE id = ${userId}
      `;
      return user[0];
    } catch (err) {
      handleDatabaseError(err);
    }
  }

  async function findByEmail(email) {
    return await base
      .findOneByField('email', email)
      .catch((e) => handleDatabaseError(e));
  }

  return { ...base, getUserInfo, findByEmail };
}
