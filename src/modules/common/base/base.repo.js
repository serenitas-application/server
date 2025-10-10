export function baseRepo(repo) {
  //   async function finByUserId(userId) {
  //     return await repo.findUnique({ where: { userId } });
  //   }

  //   async function findByEmail(email) {
  //     return await repo.findUnique({ where: { email } });
  //   }

  //   async function findById(id) {
  //     return await repo.findUnique({ where: { id } });
  //   }

  async function findByField(field) {
    return await repo.findUnique({ where: { field } });
  }

  return { findByField };
}
