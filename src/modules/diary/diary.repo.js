import { baseRepo } from '#modules/common/base/base.repo.js';

export function diaryRepo(db) {
  const repo = db['diary'];
  const base = baseRepo(repo);

  const TIME_ZONE = 'Europe/Kyiv';

  async function findDiaryDates(userId) {
    return await db.$queryRaw`
    SELECT 
      TO_CHAR(d.create_date, 'YYYY-MM-DD') AS "createDate",
      d.is_private AS "isPrivate"
    FROM diaries d
    WHERE d.user_id = ${userId}
    ORDER BY d.create_date
  `;
  }

  async function findByDate(date, userId) {
    const rows = await db.$queryRaw`
    SELECT 
      d.id,
      d.title,
      d.content,
      d.is_private AS "isPrivate",
      d.user_id AS "userId",
      d.create_date AS "createDate",
      d.edit_date AS "editDate"
    FROM diaries d
    WHERE (d.create_date AT TIME ZONE ${TIME_ZONE})::date = ${date}::date
      AND d.user_id = ${userId}
  `;
    return rows[0] ?? null;
  }

  return { ...base, findByDate, findDiaryDates };
}
