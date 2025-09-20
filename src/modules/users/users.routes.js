export async function usersRoutes(app) {
  const { user: userService } = app.services;

  app.route({
    method: 'GET',
    url: '/',
    preHandler: app.authGuard,
    handler: async (req) => {
      const { userId } = req.session;
      const result = await userService.getUserInfo(userId);
      return { data: result };
    },
  });
}
