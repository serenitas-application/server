import { authGuard } from '#modules/auth/guards/auth.guard.js';

export function appGuards(services) {
  const { session } = services;
  const auth = authGuard(session);
  return { auth };
}
