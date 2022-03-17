import { Request, Response, Router } from 'express';
import Login from '../services';
import { ILogin } from '../interfaces/login';

class LoginController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public static async logIn(req: Request, res: Response) {
    const redBody: ILogin = req.body;
    /* const result =  */await Login.verifiLogin(redBody);

    res.status(200).json({ message: 'Hello, login' });
  }

  routes() {
    this.router.post('/', LoginController.logIn);
  }
}

const { router } = new LoginController();

export default router;
