import type { ILogin } from '../interfaces/login';

class Login {
  static verifiLogin(reqRoby: ILogin) {
    // const { email, password } = reqRoby;
    console.log('Deu bom aaaaaa', reqRoby);
  }
}

export default Login;
