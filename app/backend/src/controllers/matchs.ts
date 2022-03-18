import { Request, Response, NextFunction, Router } from 'express';

export class MatchsController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.get('/', MatchsController.getMatchs);
  }

  public static async getMatchs(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: 'Hello Macths' }).end();
    } catch (error) {
      next();
    }
  }
}

const { router } = new MatchsController();

export default router;
