export interface ILogin {
  email: string;
  password: string;

  id?: number,
  username?: string,
  role?: 'user' | 'admin',
}
