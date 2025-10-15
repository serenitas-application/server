import { usersRepo } from '#modules/users/users.repo.js';
import { diaryRepo } from '#modules/diary/diary.repo.js';
import { pageGroupsRepo } from '#modules/page-groups/page-gropus.repo.js';
import { pagesRepo } from '#modules/pages/pages.repo.js';

export function appRepo(db) {
  const users = usersRepo(db);
  const diary = diaryRepo(db);
  const pages = pagesRepo(db);
  const pageGroups = pageGroupsRepo(db);

  return { users, diary, pages, pageGroups };
}
