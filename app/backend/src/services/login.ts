import * as bcrypt from 'bcryptjs';
import type { ILogin } from '../interfaces/login';
import User from '../database/models/user';

class Login {
  static async verifyPassword({ email, password }: ILogin) {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return true;
    }

    const passwordDB: string = user.password;
    const testPassword = await bcrypt.compare(password, passwordDB);
    if (!testPassword) {
      return true;
    }
  }

  static async getUser({ email }: { email: string; }) {
    const user = await User.findOne({
      where: { email }, raw: true, attributes: { exclude: ['password'] },
    });
    return user;
  }
}

export default Login;
