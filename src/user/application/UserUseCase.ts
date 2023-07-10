import { UserEntity } from '../domain/user.Entity';
import { UserRepositoryInterface } from '../domain/user.Repository';

export default class UserUseCase {
  userRepository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this.userRepository = repository;
  }

  public async registerUser(newUser: UserEntity) {
    const userCreated = await this.userRepository.registerUser(newUser);
    return userCreated;
  }

  public async getDetailUser(id: number) {
    const user = await this.userRepository.findUserById(id);
    return user;
  }
}
