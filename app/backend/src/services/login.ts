import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
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

  static async logIn({ email }: { email: string; }) {
    const user = await User.findOne({
      where: { email }, raw: true, attributes: { exclude: ['password'] },
    });

    const pwt = `${__dirname}/../../jwt.evaluation.key`;
    const fileKey = await fs.readFile(pwt, 'utf-8');

    const options = { algorithm: 'HS256', expiresIn: '7d' } as jwt.SignOptions;
    const token = jwt.sign({ user }, fileKey, options);

    return { user, token };
  }
}

export default Login;
