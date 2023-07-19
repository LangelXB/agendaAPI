import { UserEntity } from './user.Entity';

export default class UserValue implements UserEntity {
  idUser?: number;

  fullName: string;

  phoneUser: string;

  emailUser: string;

  constructor(email: string, phone: string, name?: string, id?: number) {
    this.idUser = id;
    this.fullName = name ?? 'User';
    this.phoneUser = phone;
    this.emailUser = email;
  }
}
