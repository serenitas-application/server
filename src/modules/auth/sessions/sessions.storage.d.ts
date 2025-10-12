export interface AuthSessionPayload {
  userId: string;
  userAgent: string;
  ipAddress: string;
  loginDate: Date;
}

export interface AuthSessionStore {
  create(payload: AuthSessionPayload): Promise<string>;
  get(sessionId: string): Promise<AuthSessionPayload | null>;
  delete(sessionId: string): Promise<void>;
  getSessionAgeInSeconds(): number;
}

export declare class SessionStore {
  create(payload: AuthSessionPayload): Promise<string>;
  get(sessionId: string): Promise<AuthSessionPayload | null>;
  delete(sessionId: string): Promise<void>;
  getSessionAgeInSeconds(): number;
}
