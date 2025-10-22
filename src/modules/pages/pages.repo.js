import { baseRepo } from '#modules/common/base/base.repo.js';

export function pagesRepo(db) {
  const repo = db['pages'];
  const base = baseRepo(repo);

  return { ...base };
}
