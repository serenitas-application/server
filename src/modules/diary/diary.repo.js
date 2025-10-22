import { baseRepo } from '#modules/common/base/base.repo.js';

export function diaryRepo({ db, handleDatabaseError }) {
  const repo = db['diary'];
  const base = baseRepo(repo);

  const TIME_ZONE = 'Europe/Kyiv';

  async function findDiaryDates(userId) {
    try {
      return await db.$queryRaw`
      SELECT 
        TO_CHAR(
          d.create_date AT TIME ZONE ${TIME_ZONE}, 'YYYY-MM-DD'
        ) AS "createDate",
        d.is_private AS "isPrivate"
      FROM diaries d
      WHERE d.user_id = ${userId}
      ORDER BY d.create_date
    `;
    } catch (e) {
      handleDatabaseError(e);
    }
  }

  async function findByDate(date, userId) {
    try {
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
    } catch (e) {
      handleDatabaseError(e);
    }
  }

  async function checkAlreadyExist(date) {
    try {
      return await db.$queryRaw`
      SELECT *
      FROM diaries d
      WHERE DATE(d.create_date) = DATE(${date})
    `;
    } catch (e) {
      handleDatabaseError(e);
    }
  }

  return { ...base, findByDate, findDiaryDates, checkAlreadyExist };
}
