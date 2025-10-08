import { appConfig } from '../config.js';

export const corsConfig = {
  origin: appConfig.origin,
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
