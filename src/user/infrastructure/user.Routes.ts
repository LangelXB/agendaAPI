import { Router } from 'express';
import UserRepositorySQL from './user.Repository';
import UserUseCase from '../application/UserUseCase';
import UserController from './user.controller';

const userRouter = Router();

const userRepository = new UserRepositorySQL();

const userUseCase = new UserUseCase(userRepository);

const userCtrl = new UserController(userUseCase);

userRouter.post('/', userCtrl.createUser);

userRouter.get('/:id', userCtrl.getUser);

export default userRouter;
