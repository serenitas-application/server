export function diaryService(repo) {
  async function findByDate(date, userId) {
    const items = await repo.findByDate(date, userId);
    return items;
  }

  async function getDiaryRecords(userId) {
    const dates = await repo.findDiaryDates(userId);
    return dates;
  }

  async function create(payload, userId) {
    const newItems = await repo.create({ ...payload, userId });
    return newItems;
  }

  return { findByDate, create, getDiaryRecords };
}
