import path from 'node:path';
import { databaseProvider } from '#infrastructure/db/db.js';
import { StreamForLogger } from '#infrastructure/logger.js';
import { mailerProvider } from '#infrastructure/mailer.js';
import { SessionStore } from '#infrastructure/sessions/sessions.storage.js';

export function appInfrastructure(config) {
  const LOG_FOLDER_NAME = 'logs';

  const LOG_DIR = path.resolve(process.cwd(), LOG_FOLDER_NAME);
  const streamForLogger = new StreamForLogger(LOG_DIR);

  const db = databaseProvider();
  const mailer = mailerProvider(config.mailer);
  const sessionStorage = new SessionStore();

  return { db, mailer, log: streamForLogger, sessionStorage };
}
