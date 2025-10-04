import { appConfig } from '../app-config.js';

export const corsConfig = {
  origin: appConfig.origin,
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
