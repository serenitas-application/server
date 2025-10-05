export function authService({ common }, services) {
  const { crypto, apiError } = common;
  const { user: userService } = services;

  const login = async ({ email, password }) => {
    if (!email || !password) apiError.BadRequest('Invalid data');
    const currentUser = await userService.findByEmail(email);
    if (!currentUser) apiError.BadRequest('Wrong email or password');
    const correctPassword = await crypto.verify(currentUser.password, password);
    if (!correctPassword) apiError.BadRequest('Wrong email or password');
    return { id: currentUser.id };
  };

  const registration = async (payload) => {
    const { email, username, password } = payload;
    if (!email || !username || !password) apiError.BadRequest('Invalid data');
    const registratedUser = await userService.findByEmail(email);
    if (registratedUser) apiError.Conflict(`User ${email} already exist`);
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
