export function baseRepo(repo) {
  async function create(data) {
    return await repo.create({ data });
  }

  async function update(id, data) {
    return await repo.update({ where: { id }, data });
  }

  async function findOneById(id) {
    return await repo.findUnique({ where: { id } });
  }

  async function findOneByField(field) {
    return await repo.findFirst({ where: { field } });
  }

  return { findOneById, create, update, findOneByField };
}
