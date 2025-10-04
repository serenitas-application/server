import { userService } from './modules/users/index.js';
import { authService } from './modules/auth/index.js';
import { pagesService } from './modules/pages/index.js';
import { common } from './common/index.js';

export const appServices = (db) => {
  const user = userService(db);
  const auth = authService(user, common);
  const pages = pagesService(db);
  return { user, auth, pages };
};
