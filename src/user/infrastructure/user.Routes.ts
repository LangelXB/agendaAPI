import { Router } from 'express';
import UserRepositorySQL from './user.Repository';
import UserUseCase from '../application/UserUseCase';
import UserController from './user.controller';

const userRouter = Router();

const userRepository = new UserRepositorySQL();

const userUseCase = new UserUseCase(userRepository);

const userCtrl = new UserController(userUseCase);

userRouter.post('/', userCtrl.createUser);

/**
 * @openapi
 * /user/{id}:
 *    get:
 *      parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *          type: integer
 *          minimum: 1
 *         description: The user ID
 *      tags:
 *        - user
 *      summary: "getDetail"
 *      description: Este endpoint devuelve los detalles de un ususario
 *      responses:
 *        '200':
 *          description: Retorna un usuario.
 *      security:
 *       - bearerAuth: []
 */
userRouter.get('/:id', userCtrl.getUser);

export default userRouter;
