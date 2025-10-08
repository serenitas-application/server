import { appConfig } from '../config.js';

export const sessionsConfig = (store) => ({
  secret: appConfig.session.secret,
  saveUninitialized: false,
  store,
  rolling: true,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: appConfig.session.maxAge,
    path: '/',
  },
});
