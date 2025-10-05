export function pagesService({ db }) {
  const repo = db['page'];

  async function findAll(userId) {
    const items = await repo.findMany({ where: { userId } });
    return items;
  }

  async function create(payload, userId) {
    const newItems = await repo.create({ data: { ...payload, userId } });
    return newItems;
  }

  async function update(id, payload) {
    return payload;
  }

  async function deleteOne(id) {
    return id;
  }

  async function deleteMany(id) {
    return id;
  }

  return { findAll, create, update, deleteOne, deleteMany };
}
