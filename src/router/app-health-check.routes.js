export async function appHealthCheck(app) {
  app.route({
    method: 'GET',
    url: '/',
    handler: async () => ({ alive: true }),
  });
}
