import { Router } from 'express';
import loginController from './login';

class IndexController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.use('/login', loginController);
  }
}

const { router } = new IndexController();

export default router;
