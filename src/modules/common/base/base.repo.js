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

  async function findOneByField(field, value) {
    return await repo.findFirst({ where: { [field]: value } });
  }

  return { findOneById, create, update, findOneByField };
}
