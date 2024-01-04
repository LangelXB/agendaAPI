import { IContactLeadEntity } from './user.Entity';

export interface ContactLeadRepositoryInterface {
  findUserById(id: string): Promise<IContactLeadEntity | null>;
  registerUser(user: IContactLeadEntity): Promise<IContactLeadEntity | null>;
  listUser(): Promise<IContactLeadEntity[]>;
}
