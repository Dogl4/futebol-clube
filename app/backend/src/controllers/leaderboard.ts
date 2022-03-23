import { Request, Response, Router } from 'express';
import { Leaderboard as LeaderboardService } from '../services';

class Leaderboard {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.get('/home', Leaderboard.home);
    this.router.get('/away', Leaderboard.away);
  }

  public static async home(req: Request, res: Response) {
    const result = await LeaderboardService.matchInHome();
    res.status(200).json(result).end();
  }

  public static async away(req: Request, res: Response) {
    const result = await LeaderboardService.matchInAway();
    res.status(200).json(result).end();
  }
}

const { router } = new Leaderboard();

export default router;
