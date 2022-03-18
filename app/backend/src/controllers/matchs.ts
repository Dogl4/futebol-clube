import { Request, Response, NextFunction, Router } from 'express';
import { Matchs } from '../services';

export class MatchsController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.get('/', MatchsController.getMatchs);
  }

  public static async getMatchs(req: Request, res: Response, next: NextFunction) {
    try {
      const matchs = await Matchs.getMatchs();
      res.status(200).json(matchs).end();
    } catch (error) {
      next();
    }
  }
}

const { router } = new MatchsController();

export default router;
