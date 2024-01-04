import { Request, Response } from 'express';
import ContactLeadUseCase from '../application/UserUseCase';
import { IContactLeadEntity } from '../domain/user.Entity';

export default class UserController {
  constructor(private readonly userUseCase: ContactLeadUseCase) {}

  createUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { name, email, phone } = body;

    const user: IContactLeadEntity = {
      name,
      email,
      phone,
      status: 1,
      duplicated: false,
      real_estate_group_id: '5f9b2b9b9b9b9b9b9b9b9b9b',
      location: '5f9b2b9b9b9b9b9b9b9b9b9b',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const newUser = await this.userUseCase.registerUser(user);
    res.send(newUser);
  };

  getUser = async (req: Request, res: Response) => {
    const { params } = req;
    const { id } = params;
    const users = await this.userUseCase.getDetailUser(id);
    res.send(users);
  };
}
