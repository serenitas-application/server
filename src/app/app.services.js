import { userService } from '#modules/users/users.service.js';
import { authService } from '#modules/auth/auth.service.js';
import { pagesService } from '#modules/pages/pages.service.js';
import { pageGroupsService } from '#modules/page-groups/page-groups.service.js';
import { SessionStore } from '#modules/auth/sessions/sessions.storage.js';

export function appServices(db) {
  const sessionStorage = new SessionStore();
  const user = userService(db);
  const auth = authService(user, sessionStorage);
  const pageGroups = pageGroupsService(db);
  const pages = pagesService(db);

  return { user, auth, pages, pageGroups, session: sessionStorage };
}
