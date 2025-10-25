import { userService } from '#modules/users/users.service.js';
import { authService } from '#modules/auth/auth.service.js';
import { pagesService } from '#modules/pages/pages.service.js';
import { pageGroupsService } from '#modules/page-groups/page-groups.service.js';
import { diaryService } from '#modules/diary/diary.services.js';
import { mailerService } from '#modules/mailer/mailer.service.js';

export function appServices({
  repo,
  sessionStorage,
  mailer: mailerProvider,
  logger,
  config,
}) {
  const {
    users: usersRepo,
    diary: diaryRepo,
    pages: pagesRepo,
    mailer: mailerRepo,
    pageGroups: pageGroupsRepo,
  } = repo;

  const mailer = mailerService(
    mailerRepo,
    mailerProvider,
    logger,
    config.cors.origin,
  );
  const users = userService(usersRepo, mailer);
  const auth = authService(users, sessionStorage, mailer);
  const diary = diaryService(diaryRepo);
  const pageGroups = pageGroupsService(pageGroupsRepo);
  const pages = pagesService(pagesRepo);

  return { users, auth, diary, pages, pageGroups, session: sessionStorage };
}
