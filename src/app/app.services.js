import { userService } from '#modules/users/users.service.js';
import { authService } from '#modules/auth/auth.service.js';
import { pagesService } from '#modules/pages/pages.service.js';
import { pageGroupsService } from '#modules/page-groups/page-groups.service.js';

export function appServices(db) {
  const pages = pagesService(db);
  const user = userService(db, pages);
  const auth = authService(user);
  const pageGroups = pageGroupsService(db);

  return { user, auth, pages, pageGroups };
}
