import { AUTH_SESSION_COOKIE_NAME } from './consts/index.js';
import { authSchemas } from './schemas/auth.schemas.js';

export async function authRoutes(app) {
  const { auth: authService, session } = app.services;
  const { auth } = app.guards;

  app.route({
    method: 'POST',
    url: '/login',
    schema: authSchemas.login,
    handler: async (req, reply) => {
      const { email, password } = req.body;
      const ip = req.ip;
      const userAgent = req.headers['user-agent'] || 'n/a';

      const sessionId = await authService.login({
        email,
        password,
        ipAddress: ip,
        userAgent,
      });

      reply.setCookie(AUTH_SESSION_COOKIE_NAME, sessionId, {
        httpOnly: true,
        path: '/',
        maxAge: session.getSessionAgeInSeconds(),
      });

      return { data: sessionId };
    },
  });

  app.route({
    method: 'POST',
    url: '/registration',
    schema: authSchemas.registration,
    handler: async (req) => {
      const { email, password, username } = req.body;
      const result = await authService.registration({
        email,
        username,
        password,
      });
      return { data: result };
    },
  });

  app.route({
    method: 'POST',
    url: '/logout',
    preHandler: auth.check,
    handler: async (req, reply) => {
      const { sessionId } = req.session;
      await authService.logout(sessionId);
      reply.clearCookie(AUTH_SESSION_COOKIE_NAME, {
        path: '/',
        httpOnly: true,
      });

      return { ok: true };
    },
  });
}
