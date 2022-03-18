import { Router } from 'express';
import loginController from './login';
import clubsController from './clubs';

class IndexController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.use('/login', loginController);
    this.router.use('/clubs', clubsController);
  }
}

const { router } = new IndexController();

export default router;
