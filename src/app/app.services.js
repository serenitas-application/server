import { userService } from '#modules/users/users.service.js';
import { authService } from '#modules/auth/auth.service.js';
import { pagesService } from '#modules/pages/pages.service.js';
import { pageGroupsService } from '#modules/page-groups/page-groups.service.js';
import { diaryService } from '#modules/diary/diary.services.js';

export function appServices({ repo, sessionStorage, mailer }) {
  const {
    users: usersRepo,
    diary: diaryRepo,
    pages: pagesRepo,
    pageGroups: pageGroupsRepo,
  } = repo;

  const users = userService(usersRepo, mailer);
  const auth = authService(users, sessionStorage, mailer);
  const diary = diaryService(diaryRepo);
  const pageGroups = pageGroupsService(pageGroupsRepo);
  const pages = pagesService(pagesRepo);

  return { users, auth, diary, pages, pageGroups, session: sessionStorage };
}
