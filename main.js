import 'dotenv/config';
import Fastify from 'fastify';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import { appServices } from './src/setup.js';
import appRoutes from './src/router/index.js';
import { appConfig } from './src/app-config.js';
import connectPgSimple from 'connect-pg-simple';
import { pg } from './src/infrastructure/db.js';
import { StreamForLogger } from './src/infrastructure/logger.js';
import { httpErrorHandler } from './src/infrastructure/http-error-handling.js';
import { PrismaClient } from '@prisma/client';
import { authGuard } from './src/guards/auth.guard.js';
import { corsConfig } from './src/plugins/cors.js';
import { sessionsConfig } from './src/plugins/sessions.js';

const LOG_FOLDER_PATH = './logs';
const streamForLogger = new StreamForLogger(LOG_FOLDER_PATH);
const pool = new pg.Pool(appConfig.db);
const PgStore = connectPgSimple(fastifySession);
const store = new PgStore({
  pool,
  tableName: 'sessions',
  createTableIfMissing: true,
});

const app = Fastify({
  logger: { level: 'info', stream: streamForLogger },
  trustProxy: true,
});
const prisma = new PrismaClient();

app.register(cors, corsConfig);
app.register(fastifyCookie);
app.register(fastifySession, sessionsConfig(store));
app.setErrorHandler(httpErrorHandler);
app.decorate('authGuard', authGuard);
app.decorate('services', appServices(prisma));
await app.register(appRoutes);

const server = async () => {
  try {
    await prisma.$connect();
    await app.listen({ port: appConfig.port });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void server();
