import { Request, Response, Router } from 'express';
import userRouter from '../user/infrastructure/user.Routes';
import leadRouter from '../lead/infrastructure/lead.Routes';

const routerIndex = Router();

routerIndex.get('/', (_req: Request, res: Response) => {
  res.send('agendaAPI!!');
});

routerIndex.use('/user', userRouter);
routerIndex.use('/lead', leadRouter);

export default routerIndex;
