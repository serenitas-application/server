import { userService } from './modules/users/index.js';
import { authService } from './modules/auth/index.js';
import { journalService } from './modules/journal/index.js';
import { common } from './common/index.js';

export const appServices = (db) => {
  const user = userService(db);
  const auth = authService(user, common);
  const journal = journalService(db);
  return { user, auth, journal };
};
