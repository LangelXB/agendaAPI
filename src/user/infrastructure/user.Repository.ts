import { UserEntity } from '../domain/user.Entity';
import { UserRepositoryInterface } from '../domain/user.Repository';
import User from './user.Model';

export default class UserRepositorySQL implements UserRepositoryInterface {
  findUserById(id: number): Promise<UserEntity | null> {
    const user = User.findOneBy({ id });
    return user;
  }

  registerUser(user: UserEntity): Promise<UserEntity | null> {
    const newUser = new User();
    newUser.lastName = user.lastName;
    return newUser.save();
  }

  listUser(): Promise<UserEntity[]> {
    const userList = User.find();
    return userList;
  }
}
