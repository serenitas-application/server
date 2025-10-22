import { userService } from '#modules/users/users.service.js';
import { authService } from '#modules/auth/auth.service.js';
import { pagesService } from '#modules/pages/pages.service.js';
import { pageGroupsService } from '#modules/page-groups/page-groups.service.js';
import { SessionStore } from '#modules/auth/sessions/sessions.storage.js';
import { diaryService } from '#modules/diary/diary.services.js';

export function appServices(repo) {
  const {
    users: usersRepo,
    diary: diaryRepo,
    pages: pagesRepo,
    pageGroups: pageGroupsRepo,
  } = repo;

  const sessionStorage = new SessionStore();
  const users = userService(usersRepo);
  const auth = authService(users, sessionStorage);
  const diary = diaryService(diaryRepo);
  const pageGroups = pageGroupsService(pageGroupsRepo);
  const pages = pagesService(pagesRepo);

  return { users, auth, diary, pages, pageGroups, session: sessionStorage };
}
