import { Router } from 'express';
import loginController from './login';
import clubsController from './clubs';
import matchsController from './matchs';
import leaderboardController from './leaderboard';

class IndexController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.use('/login', loginController);
    this.router.use('/clubs', clubsController);
    this.router.use('/matchs', matchsController);
    this.router.use('/leaderboard', leaderboardController);
  }
}

const { router } = new IndexController();

export default router;
