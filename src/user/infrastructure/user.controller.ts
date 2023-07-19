import { Request, Response } from 'express';
import UserUseCase from '../application/UserUseCase';
import UserValue from '../domain/uset.Value';
import { UserEntity } from '../domain/user.Entity';

export default class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const { fullName, emailUser, phoneUser }: UserEntity = req.body;
      const user = new UserValue(emailUser, phoneUser, fullName);
      const newUser = await this.userUseCase.registerUser(user);
      res.send(newUser);
    } catch (error) {
      console.log(error);
      res.send('Error');
    }
  };

  getUser = async (req: Request, res: Response) => {
    const { params } = req;
    const { id } = params;
    const users = await this.userUseCase.getDetailUser(Number(id));
    res.send(users);
  };
}
