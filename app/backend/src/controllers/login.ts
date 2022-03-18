import { Request, Response, NextFunction, Router } from 'express';
import jwtAuth from '../middlewares/jwtAuth';
import Login from '../services';
import { ILogin } from '../interfaces/login';

export class LoginController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.post('/', LoginController.verifyData, LoginController.logIn);
    this.router.get('/validate', jwtAuth, LoginController.roleUser);
  }

  public static async verifyData(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as ILogin;
      if (!email || !password) {
        res.status(401).json({ message: 'All fields must be filled' }).end();
      }
      const error = await Login.verifyPassword({ email, password });
      if (error || !/\S+@\S+\.\S+/.test(email)) {
        res.status(401).json({ message: 'Incorrect email or password' }).end();
      }
      next();
    } catch (error) {
      next();
    }
  }

  public static async logIn(req: Request, res: Response) {
    try {
      const { email } = req.body as ILogin;
      const user = await Login.logIn({ email });
      res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
    }
  }

  public static async roleUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string | undefined = req.headers.authorization;
      const role = await Login.roleUser(token);
      res.status(200).json(role).end();
    } catch (error) {
      next();
    }
  }
}

const { router } = new LoginController();

export default router;
