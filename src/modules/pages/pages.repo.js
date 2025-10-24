import { baseRepo } from '#modules/common/base/base.repo.js';

export function pagesRepo({ db, handleDatabaseError }) {
  const repo = db['pages'];
  const base = baseRepo(repo, handleDatabaseError);

  return { ...base };
}
