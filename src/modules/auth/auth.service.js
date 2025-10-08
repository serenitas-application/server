import { AppError, ErrorCode } from '../../common/app-error.js';

export function authService(userService) {
  const login = async ({ email, password }) => {
    const currentUser = await userService.findByEmail(email);
    if (!currentUser) {
      throw new AppError(
        ErrorCode.INVALID_CREDENTIALS,
        'Wrong email or password',
      );
    }
    const correctPassword = await crypto.verify(currentUser.password, password);
    if (!correctPassword) {
      throw new AppError(
        ErrorCode.INVALID_CREDENTIALS,
        'Wrong email or password',
      );
    }
    return { id: currentUser.id };
  };

  const registration = async (payload) => {
    const { email, username, password } = payload;
    const registratedUser = await userService.findByEmail(email);
    if (registratedUser) {
      throw new AppError(ErrorCode.CONFLICT, 'Current account already exist');
    }
    const hashPassword = await crypto.hash(password);
    const result = await userService.create({
      email,
      password: hashPassword,
      username,
    });
    return { id: result.id };
  };

  return { login, registration };
}
