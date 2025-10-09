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

export interface UserService {
  findByEmail(email: string): Promise<{ id: number; password: string } | null>;
  create(data: {
    email: string;
    username: string;
    password: string;
  }): Promise<{ id: number }>;
}

export declare function authService(userService: UserService): {
  login(payload: LoginPayload): Promise<AuthResult>;
  registration(payload: RegistrationPayload): Promise<AuthResult>;
};
