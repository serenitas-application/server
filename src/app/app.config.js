const SESSION_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30;

export const appConfig = {
  port: Number(process.env.PORT || 5000),
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: SESSION_COOKIE_MAX_AGE,
  },
  db: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  cors: {
    origin: process.env.API_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
};
