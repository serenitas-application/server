import { PrismaClient } from '@prisma/client';

// export class Database {
//   #db;
//   constructor() {
//     this.#db = new PrismaClient();
//   }

//   get() {
//     return this.#db;
//   }
// }

export function databaseProvider() {
  const db = new PrismaClient();
  return db;
}
