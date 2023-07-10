import { Request, Response } from 'express';
import UserUseCase from '../application/UserUseCase';
import UserValue from '../domain/uset.Value';

export default class UserController {
  userUseCase: UserUseCase;

  constructor(usercase: UserUseCase) {
    this.userUseCase = usercase;
  }

  createUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { name, email, lastName } = body;
    const user = new UserValue(name, email, lastName);
    const newUser = await this.userUseCase.registerUser(user);
    res.send(newUser);
  };

  getUser = async (req: Request, res: Response) => {
    const { params } = req;
    const { id } = params;
    const users = await this.userUseCase.getDetailUser(Number(id));
    res.send(users);
  };
}
