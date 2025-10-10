import path from 'node:path';
import router from './router.js';
import { appConfig } from './app/app.config.js';
import { appServices } from './app/app.services.js';
import { appGuards } from './app/app.guards.js';
import { swaggerConfig } from './app/app.swagger.js';
import { errorHandler } from './infrastructure/error-handler.js';
import { StreamForLogger } from './infrastructure/logger.js';
import { databaseProvider } from './infrastructure/db.js';

export async function setupApplication() {
  const LOG_FOLDER_NAME = 'logs';

  const LOG_DIR = path.resolve(process.cwd(), LOG_FOLDER_NAME);
  const streamForLogger = new StreamForLogger(LOG_DIR);

  const db = databaseProvider();
  const services = appServices(db);
  const guards = appGuards();

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
