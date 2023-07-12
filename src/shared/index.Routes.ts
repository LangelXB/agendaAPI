import { Request, Response, Router } from 'express';
import userRouter from '../user/infrastructure/user.Routes';

const routerIndex = Router();

/**
 * Post track
 * @openapi
 * /:
 *    get:
 *      tags:
 *        - index
 *      summary: "Welcome"
 *      description: Este endpoint es de bienvenida
 *      responses:
 *        '200':
 *          description: Retorna un mensajito.
 *      security:
 *       - bearerAuth: []
 */
routerIndex.get('/', (_req: Request, res: Response) => {
  res.send('agendaAPI!!');
});

routerIndex.use('/user', userRouter);

export default routerIndex;
