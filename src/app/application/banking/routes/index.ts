import { Application, Request, Response } from 'express';
import cardRouter from './cardRoutes';

export default (app: Application, prefix: string): void => {
  app.get(prefix, (req: Request, res: Response) => res.send({ message: `Welcome to '${prefix}' routes` }));
  app.use(prefix, cardRouter);
};
