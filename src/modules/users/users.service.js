export function userService(repo) {
  const usersRepo = repo['User'];

  async function getUserInfo(userId) {
    return await usersRepo.findUnique({ where: { id: userId } });
  }

  async function create(payload) {
    const newUser = await usersRepo.create({ data: payload });
    return newUser;
  }

  async function findByEmail(email) {
    const user = await usersRepo.findUnique({ where: { email } });
    return user;
  }

  return { create, findByEmail, getUserInfo };
}
