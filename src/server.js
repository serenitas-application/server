import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyCookie from '@fastify/cookie';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export async function startServer(app) {
  const { config, log, errorHandler, guards, services, swagger, routes } = app;
  const server = fastify({
    logger: { level: 'info', stream: log },
    trustProxy: true,
  });

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
  await server.register(fastifyCookie, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
  await server.register(fastifyHelmet);

  await server.register(fastifySwagger, swagger);
  await server.register(fastifySwaggerUi, {
    routePrefix: '/api',
  });

  await server.register(routes.app);
  await server.register(routes.auth, { prefix: '/api/auth' });
  await server.register(routes.users, { prefix: '/api/users' });
  await server.register(routes.pages, { prefix: '/api/pages' });
  await server.register(routes.pageGroups, { prefix: '/api/page-groups' });

  const startedOn = await server.listen({
    host: config.host,
    port: config.port,
  });

  server.log.error(`Application runs on ${startedOn}`);
}
