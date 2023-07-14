import { UserEntity } from './user.Entity';

export interface UserRepositoryInterface {
  findUserById(id: number): Promise<UserEntity | null>;
  registerUser(user: UserEntity): Promise<UserEntity | null>;
  listUser(): Promise<UserEntity[]>;
}
