import { authGuard } from '#modules/auth/guards/auth.guard.js';

export function appGuards(db) {
  const auth = authGuard(db);
  return { auth };
}
