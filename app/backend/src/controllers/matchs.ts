import { Request, Response, NextFunction, Router } from 'express';
import { Matchs } from '../services';

export class MatchsController {
  public router: Router;

  constructor() {
    this.router = Router();
    // The route inProgress need stay first
    this.router.get('/', MatchsController.getMatchInProgress);
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

  public static async getMatchInProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      console.log('inProgress', inProgress);
      res.status(200).json({ message: 'Hello Match inProgress' }).end();
    } catch (error) {
      next();
    }
  }
}

const { router } = new MatchsController();

export default router;
