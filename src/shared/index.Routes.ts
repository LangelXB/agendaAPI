import { Request, Response, Router } from 'express';
import userRouter from '../user/infrastructure/user.Routes';

const routerIndex = Router();

routerIndex.get('/', (_req: Request, res: Response) => {
  res.send('agendaAPI!!');
});

routerIndex.use('/user', userRouter);

export default routerIndex;
