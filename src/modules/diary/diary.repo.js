import { baseRepo } from '#modules/common/base/base.repo.js';

export function diaryRepo(db) {
  const repo = db['diary'];
  const base = baseRepo(repo);

  return { ...base };
}
