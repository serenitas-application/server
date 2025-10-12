import path from 'node:path';
import { appConfig } from './app/app.config.js';
import { appRoutes } from './app/app.routes.js';
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
  const guards = appGuards({ session: services.session });

  return {
    services,
    guards,
    routes: appRoutes,
    errorHandler,
    config: appConfig,
    swagger: swaggerConfig,
    log: streamForLogger,
  };
}
