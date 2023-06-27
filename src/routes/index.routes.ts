import { Request, Response, Router } from 'express';

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

export default routerIndex;
