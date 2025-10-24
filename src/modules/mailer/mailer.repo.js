import { baseRepo } from '#modules/common/base/base.repo.js';

export function mailerRepo({ db, handleDatabaseError }) {
  const repo = db['emailVerifyToken'];
  const base = baseRepo(repo, handleDatabaseError);

  return { ...base };
}
