export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegistrationPayload {
  email: string;
  username: string;
  password: string;
}
export interface AuthResult {
  id: number;
}

interface SessionStore {
  create(password: string): string;
}

interface UserService {
  create(password: string): string;
}

export declare function authService(
  userService: UserService,
  sessionStore: SessionStore,
): {
  login(payload: LoginPayload): Promise<AuthResult>;
  registration(payload: RegistrationPayload): Promise<AuthResult>;
};
