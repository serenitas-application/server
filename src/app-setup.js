import { userService } from './modules/users/users.service.js';
import { authService } from './modules/auth/auth.service.js';
import { pagesService } from './modules/pages/pages.service.js';
import { common } from './common/index.js';
import { pageGroupsService } from './modules/page-groups/page-groups.service.js';

export const appServices = (db) => {
  const shared = { db, common };
  const pageGroups = pageGroupsService(shared);
  const user = userService(shared, { pageGroups });
  const auth = authService(shared, { user });
  const pages = pagesService(shared);
  return { pageGroups, user, auth, pages };
};
