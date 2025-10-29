import 'dotenv/config';
import path from 'node:path';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyCookie from '@fastify/cookie';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { Logger, StreamForLogger } from '#infrastructure/logger.js';
import { setupApplication } from './setup.js';

const LOG_FOLDER_NAME = 'logs';

const LOG_DIR = path.resolve(process.cwd(), LOG_FOLDER_NAME);
const streamForLogger = new StreamForLogger(LOG_DIR);

const server = fastify({
  logger: { level: 'info', stream: streamForLogger },
  trustProxy: true,
});

const logger = new Logger(server.log);

const { config, errorHandler, guards, services, swagger, routes } =
  await setupApplication(logger);

server.decorateRequest('session', null);

server.setNotFoundHandler(errorHandler.notFound);
server.setSchemaErrorFormatter(errorHandler.validateSchemas);
server.setErrorHandler(errorHandler.api);
await server.register(fastifyRateLimit, {
  errorResponseBuilder: errorHandler.tooManyRequests,
});

await server.decorate('guards', guards);
await server.decorate('services', services);

await server.register(fastifyCors, config.cors);
await server.register(fastifyCookie);
await server.register(fastifyHelmet);

await server.register(fastifySwagger, swagger);
await server.register(fastifySwaggerUi, {
  routePrefix: '/api',
});

await server.register(routes.app);
await server.register(routes.auth, { prefix: '/api/auth' });
await server.register(routes.users, { prefix: '/api/users' });
await server.register(routes.diary, { prefix: '/api/diary' });
await server.register(routes.pages, { prefix: '/api/pages' });
await server.register(routes.pageGroups, { prefix: '/api/page-groups' });

async function startServer() {
  const startedOn = await server.listen({
    host: config.host,
    port: config.port,
  });
  const startesAt = new Date().toISOString();
  logger.log(`Application runs on ${startedOn}, at ${startesAt}`);
}

void startServer();
