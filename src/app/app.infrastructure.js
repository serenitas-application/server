import { databaseProvider } from '#infrastructure/db/db.js';
import { mailerProvider } from '#infrastructure/mailer.js';
import { SessionStore } from '#infrastructure/sessions/sessions.storage.js';

export function appInfrastructure(config, logger) {
  const db = databaseProvider();
  const mailer = mailerProvider(config.mailer, logger);
  const sessionStorage = new SessionStore();

  return { db, mailer, sessionStorage };
}
