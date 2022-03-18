import { Request, Response, NextFunction, Router } from 'express';
import { Clubs } from '../services';

export class ClubsController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.get('/', ClubsController.getClubs);
    this.router.get('/:id', ClubsController.getClubById);
  }

  public static async getClubs(req: Request, res: Response, next: NextFunction) {
    try {
      const clubs = await Clubs.getAllClubs();
      res.status(200).json(clubs).end();
    } catch (error) {
      next();
    }
  }

  public static async getClubById(req: Request, res: Response, next: NextFunction) {
    try {
      const club = await Clubs.getClubById({ id: +req.params.id });
      res.status(200).json(club).end();
    } catch (error) {
      next();
    }
  }
}

const { router } = new ClubsController();

export default router;
