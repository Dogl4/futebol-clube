import { Request, Response, Router } from 'express';

class Leaderboard {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.get('/home', Leaderboard.home);
  }

  public static home(req: Request, res: Response) {
    res.send('Welcome to the leaderboard');
  }
}

const { router } = new Leaderboard();

export default router;
