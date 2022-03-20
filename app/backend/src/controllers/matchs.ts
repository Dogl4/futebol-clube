import { Request, Response, NextFunction, Router } from 'express';
import jwtAuth from '../middlewares/jwtAuth';
import { Matchs } from '../services';

export class MatchsController {
  public router: Router;

  constructor() {
    this.router = Router();
    // The route inProgress need stay first
    this.router.get('/', MatchsController.getMatchInProgress);
    this.router.get('/', MatchsController.getMatchs);
    this.router.post('/', jwtAuth, MatchsController.createMatch);
    this.router.patch('/:id/finish', jwtAuth, MatchsController.finishMatch);
    this.router.patch('/:id', jwtAuth, MatchsController.updateMatch);
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

  public static async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeam, awayTeam } = req.body;
      if (homeTeam === awayTeam) {
        res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' }).end();
      }

      const match = await Matchs.createMatch(req.body);
      if (!match) {
        return res.status(401).json({ message: 'There is no team with such id!' }).end();
      }
      return res.status(201).json(match).end();
    } catch (error) {
      next();
    }
  }

  public static async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await Matchs.finishMatch(+id);
      if (result) {
        res.status(200).json({ message: 'Finish' }).end();
      }
      res.status(404).json({ message: 'Match not found or not in progress' }).end();
    } catch (error) {
      next();
    }
  }

  public static async updateMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const match = await Matchs.updateMatch(+id, req.body);
      if (match) {
        res.status(200).json({ message: 'Match updated' }).end();
      }
      res.status(404).json({ message: 'Match not found or not in progress' }).end();
    } catch (error) {
      next();
    }
  }
}

const { router } = new MatchsController();

export default router;
