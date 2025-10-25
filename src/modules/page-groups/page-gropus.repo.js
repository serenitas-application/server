import { baseRepo } from '#modules/common/base/base.repo.js';

export function pageGroupsRepo({ db, handleDatabaseError }) {
  const repo = db['pageGroup'];
  const base = baseRepo(repo, handleDatabaseError);

  return { ...base };
}
