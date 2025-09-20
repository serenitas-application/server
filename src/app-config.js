export const appConfig = {
  port: Number(process.env.PORT || 5000),
  origin: process.env.API_ORIGIN,
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
  db: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
