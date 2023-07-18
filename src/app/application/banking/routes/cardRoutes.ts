import express, { Request, Response, Router } from 'express';
import { asyncHandler } from '../../shared/framework/utils/asyncHandler';
import { CardCreateController } from '../controllers/cards/cardCreateController';
import { CardSearchOneController } from '../controllers/cards/cardSearchOneController';

const router: Router = express.Router();

router.post('/card', asyncHandler((req: Request, res: Response) => {
  const cardSearchOneController: CardSearchOneController = new CardSearchOneController();

  return cardSearchOneController.run(req, res);
}));

router.post('/cards', asyncHandler((req: Request, res: Response) => {
  const cardCreateController: CardCreateController = new CardCreateController();

  return cardCreateController.run(req, res);
}));


export default router;
