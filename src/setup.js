import path from 'node:path';
import router from './router/index.js';
import { databaseProvider } from './infrastructure/db.js';
import { appConfig } from './config.js';
import { errorHandler } from './infrastructure/error-handler.js';
import { userService } from './modules/users/index.js';
import { authService } from './modules/auth/index.js';
import { journalService } from './modules/journal/index.js';
import { authGuard } from './modules/auth/auth.guard.js';
import { swaggerConfig } from './swagger/app.swagger.js';
import { StreamForLogger } from './infrastructure/logger.js';

const LOG_FOLDER_NAME = 'logs';

function appServices(db) {
  const user = userService(db);
  const auth = authService(user);
  const journal = journalService(db);
  return { user, auth, journal };
}

function appGuards(db) {
  const auth = authGuard(db);
  return { auth };
}

export async function createAplication() {
  const LOG_DIR = path.resolve(process.cwd(), LOG_FOLDER_NAME);
  const streamForLogger = new StreamForLogger(LOG_DIR);

  const db = databaseProvider();
  const services = appServices(db);
  const guards = appGuards(db);

  return {
    services,
    guards,
    router,
    errorHandler,
    config: appConfig,
    swagger: swaggerConfig,
    log: streamForLogger,
  };
}
