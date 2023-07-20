import { Request, Response } from 'express';
import UserUseCase from '../application/UserUseCase';
import UserValue from '../domain/uset.Value';
import { UserEntity } from '../domain/user.Entity';
import { BadResponse, CodeResponse, GoodResponse } from '../../shared/response.interface';

export default class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  createUser = async (req: Request, res: Response<GoodResponse<UserEntity> | BadResponse>) => {
    try {
      const { fullName, emailUser, phoneUser }: UserEntity = req.body;
      const user = new UserValue(emailUser, phoneUser, fullName);
      const newUser = await this.userUseCase.registerUser(user);
      if (newUser == null) throw new Error('Error al crear usuario');
      return res.send({ status: CodeResponse.Success, message: '', data: newUser });
    } catch (error: any) {
      return res.send({ status: CodeResponse.Error, message: error.message });
    }
  };

  getUser = async (req: Request, res: Response<GoodResponse<UserEntity | {}> | BadResponse>) => {
    try {
      const { params } = req;
      const { id } = params;
      const user = await this.userUseCase.getDetailUser(Number(id));
      if (user == null) return res.send({ status: CodeResponse.Success, message: 'Usuario no encontrado', data: {} });
      return res.send({ status: CodeResponse.Success, message: '', data: user });
    } catch (error: any) {
      return res.send({ status: CodeResponse.Error, message: error.message });
    }
  };
}
