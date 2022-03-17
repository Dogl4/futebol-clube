export interface ILogin {
  email: string;
  password: string;

  id?: number,
  username?: number,
  role?: 'user' | 'admin',
}
