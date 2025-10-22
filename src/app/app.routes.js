import { authRoutes } from '#modules/auth/auth.routes.js';
import { diaryRoutes } from '#modules/diary/diary.routes.js';
import { pageGroupsRoutes } from '#modules/page-groups/page-groups.routes.js';
import { pagesRoutes } from '#modules/pages/pages.routes.js';
import { usersRoutes } from '#modules/users/users.routes.js';

async function mainRoutes(app) {
  app.route({
    method: 'GET',
    url: '/health',
    handler: async () => ({ alive: true }),
  });
}

export const appRoutes = {
  app: mainRoutes,
  auth: authRoutes,
  users: usersRoutes,
  diary: diaryRoutes,
  pages: pagesRoutes,
  pageGroups: pageGroupsRoutes,
};
