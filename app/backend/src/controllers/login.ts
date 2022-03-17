import { Request, Response, NextFunction, Router } from 'express';
import Login from '../services';
import { ILogin } from '../interfaces/login';

class LoginController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public static async verifyData(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as ILogin;
    if (!email || !password) {
      res.status(401).json({ message: 'All fields must be filled' }).end();
    }

    const error = await Login.verifyPassword({ email, password });
    if (error || !/\S+@\S+\.\S+/.test(email)) {
      res.status(401).json({ message: 'Incorrect email or password' }).end();
    }

    next();
  }

  public static async logIn(req: Request, res: Response) {
    const { email } = req.body as ILogin;

    const user = await Login.getUser({ email });
    console.log('user ==>', user);

    res.status(200).json({ message: 'Hello, login' });
  }

  routes() {
    this.router.post('/', LoginController.verifyData, LoginController.logIn);
  }
}

const { router } = new LoginController();

export default router;
