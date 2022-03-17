import { Request, Response, Router } from 'express';

class LoginController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public static async logIn(_req: Request, res: Response) {
    res.status(200).json({ message: 'Hello, login' });
  }

  routes() {
    this.router.post('/', LoginController.logIn);
  }
}

export default new LoginController().routes;
