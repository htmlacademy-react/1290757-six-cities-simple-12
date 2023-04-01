const AUTH_TOKEN_KEY_NAME: string = 'six-cities-token' as const;

export type Token = string;

export const getToken = (): Token => {
  const token: string | null = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
