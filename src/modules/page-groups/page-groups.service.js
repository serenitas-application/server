export function pageGroupsService({ db, common }) {
  const repo = db['pageGroup'];
  const { apiError } = common;

  async function findAll(query, userId) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const total = await repo.count({ where: { userId } });
    const pageGroups = await repo.findMany({
      where: { userId },
      skip,
      take: limit,
    });
    return { total, page, limit, items: pageGroups };
  }

  async function create(payload, userId) {
    const { name } = payload;
    const alreadyExist = await repo.findFirst({ where: { name, userId } });
    if (alreadyExist) {
      return apiError.BadRequest('Group with this name already exist');
    }
    return await repo.create({ data: { ...payload, userId } });
  }

  return { create, findAll };
}
