import { baseRepo } from '#modules/common/base/base.repo.js';

export function pageGroupsRepo(db) {
  const repo = db['pageGroup'];
  const base = baseRepo(repo);

  return { ...base };
}
