import { Request, Response, NextFunction, Router } from 'express';

export class ClubsController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.get('/', ClubsController.getClubs);
  }

  public static getClubs(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: 'Hello Clubs' }).end();
    } catch (error) {
      next();
    }
  }
}

const { router } = new ClubsController();

export default router;
