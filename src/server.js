import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyCookie from '@fastify/cookie';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export async function startServer(app) {
  const server = fastify({
    logger: { level: 'info', stream: app.log },
    trustProxy: true,
  });

  server.decorateRequest('user', null);
  server.decorateRequest('sessionId', '');

  server.setNotFoundHandler(app.errorHandler.notFound);
  server.setSchemaErrorFormatter(app.errorHandler.validateSchemas);
  server.setErrorHandler(app.errorHandler.api);
  await server.register(fastifyRateLimit, {
    errorResponseBuilder: app.errorHandler.tooManyRequests,
  });

  await server.decorate('guards', app.guards);
  await server.decorate('services', app.services);

  await server.register(fastifyCors, app.config.cors);
  await server.register(fastifyCookie);
  await server.register(fastifyHelmet);

  await server.register(app.router);

  await server.register(fastifySwagger, app.swagger);
  await server.register(fastifySwaggerUi, {
    routePrefix: '/api',
  });

  const startedOn = await server.listen({
    port: app.config.port,
  });

  server.log.error(`Application runs on ${startedOn}`);
}
