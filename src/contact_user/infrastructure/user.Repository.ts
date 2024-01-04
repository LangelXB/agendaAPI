import { IContactLeadEntity } from '../domain/user.Entity';
import { ContactLeadRepositoryInterface } from '../domain/user.Repository';
import ContactLeadModel from './user.Model';

export default class UserRepositorySQL implements ContactLeadRepositoryInterface {
  findUserById(id: string): Promise<IContactLeadEntity | null> {
    const user = ContactLeadModel.findById(id);
    return user;
  }

  registerUser(user: IContactLeadEntity): Promise<IContactLeadEntity | null> {
    const newUser = new ContactLeadModel();
    newUser.name = user.name;
    return newUser.save();
  }

  listUser(): Promise<IContactLeadEntity[]> {
    const userList = ContactLeadModel.find();
    return userList;
  }
}
