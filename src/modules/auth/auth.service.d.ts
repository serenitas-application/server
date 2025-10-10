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

export declare function authService(userService: any): {
  login(payload: LoginPayload): Promise<AuthResult>;
  registration(payload: RegistrationPayload): Promise<AuthResult>;
};
