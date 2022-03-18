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
      if (Object.keys(req.query).length) {
        if (inProgress === 'true') {
          const matchs = await Matchs.getMatchInProgress();
          res.status(200).json(matchs).end();
        }
        res.status(404).json({ Expected_route: '/matchs?inProgress=true' }).end();
      }
      next();
    } catch (error) {
      next();
    }
  }
}

const { router } = new MatchsController();

export default router;
