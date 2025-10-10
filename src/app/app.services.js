import { userService } from '#modules/users/users.service.js';
import { authService } from '#modules/auth/auth.service.js';

export function appServices(db) {
  const user = userService(db);
  const auth = authService(user);
  return { user, auth, journal };
}
