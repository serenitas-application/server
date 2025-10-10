export async function appRoutes(app) {
  app.route({
    method: 'GET',
    url: '/health',
    handler: async () => ({ alive: true }),
  });
}
