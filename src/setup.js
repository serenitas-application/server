import { appConfig } from './app/app.config.js';
import { appRoutes } from './app/app.routes.js';
import { appServices } from './app/app.services.js';
import { appGuards } from './app/app.guards.js';
import { swaggerConfig } from './app/app.swagger.js';
import { errorHandler } from './infrastructure/error-handler.js';
import { appRepo } from './app/app.repo.js';
import { appInfrastructure } from './app/app.infrastructure.js';

export async function setupApplication(logger) {
  const { db, log, sessionStorage, mailer } = appInfrastructure(
    appConfig,
    logger,
  );
  const repo = appRepo(db);
  const services = appServices({
    repo,
    sessionStorage,
    mailer,
    logger,
  });
  const guards = appGuards({ session: sessionStorage });

  return {
    services,
    guards,
    routes: appRoutes,
    errorHandler,
    config: appConfig,
    swagger: swaggerConfig,
    log,
  };
}
