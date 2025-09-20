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
import { common } from './src/common/index.js';
import { PrismaClient } from '@prisma/client';
import { authGuard } from './src/common/guards/auth.guard.js';

const prisma = new PrismaClient();

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

app.register(cors, {
  origin: appConfig.origin,
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
});
app.register(fastifyCookie);
app.register(fastifySession, {
  secret: appConfig.session.secret,
  saveUninitialized: false,
  store,
  rolling: true,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: appConfig.session.maxAge,
    path: '/',
  },
});
app.setErrorHandler(httpErrorHandler);
app.decorate('authGuard', authGuard);
app.decorate('services', appServices(prisma, common));
await app.register(appRoutes);

const server = async () => {
  try {
    await app.listen({ port: appConfig.port });
  } catch (error) {
    app.log.error(error, 'Server ERROR');
    process.exit(1);
  }
};

void server();
