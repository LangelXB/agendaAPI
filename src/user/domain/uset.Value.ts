import { UserEntity } from './user.Entity';

export default class UserValue implements UserEntity {
  name: string;

  lastName: string;

  email: string;

  constructor(name: string, email: string, lastName: string) {
    this.name = name;
    this.email = email;
    this.lastName = lastName;
  }
}
