const PAGE_GROUP_DEFAULT = 'General';

export function userService(db, services) {
  const { pageGroups: pageGroupsService } = services;
  const usersRepo = db['user'];

  async function getUserInfo(userId) {
    return await usersRepo.findUnique({ where: { id: userId } });
  }

  async function create(payload) {
    const groupObj = {
      name: PAGE_GROUP_DEFAULT,
    };
    const user = await usersRepo.create({ data: payload });
    await pageGroupsService.create(groupObj, user.id);
    return user;
  }

  async function findByEmail(email) {
    return await usersRepo.findUnique({ where: { email } });
  }

  return { create, findByEmail, getUserInfo };
}
