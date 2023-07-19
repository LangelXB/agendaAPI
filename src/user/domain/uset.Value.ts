import { UserEntity } from './user.Entity';

export default class UserValue implements UserEntity {
  id?: number;

  fullName: string;

  phoneUser: string;

  emailUser: string;

  constructor(email: string, phone: string, name?: string, id?: number) {
    this.id = id;
    this.fullName = name ?? 'User';
    this.phoneUser = phone;
    this.emailUser = email;
  }
}
