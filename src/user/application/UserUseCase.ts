import { UserEntity } from '../domain/user.Entity';
import { UserRepositoryInterface } from '../domain/user.Repository';

export default class UserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  public async registerUser(newUser: UserEntity) {
    const userCreated = await this.userRepository.registerUser(newUser);
    return userCreated;
  }

  public async getDetailUser(id: number) {
    const user = await this.userRepository.findUserById(id);
    return user;
  }
}
