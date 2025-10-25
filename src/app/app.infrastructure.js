import { databaseProvider } from '#infrastructure/db/db.js';
import { mailerProvider } from '#infrastructure/mailer.js';
import { SessionStore } from '#infrastructure/sessions/sessions.store.js';
import { TokensStore } from '#infrastructure/tokens/tokens.store.js';

export function appInfrastructure(config, logger) {
  const db = databaseProvider();
  const mailer = mailerProvider(config.mailer, logger);
  const sessionStore = new SessionStore();
  const tokensStore = new TokensStore();

  return { db, mailer, sessionStore, tokensStore };
}
