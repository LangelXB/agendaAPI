import { IContactLeadEntity } from '../domain/user.Entity';
import { ContactLeadRepositoryInterface } from '../domain/user.Repository';

export default class ContactLeadUseCase {
  constructor(private readonly userRepository: ContactLeadRepositoryInterface) {}

  public async registerUser(newUser: IContactLeadEntity) {
    const userCreated = await this.userRepository.registerUser(newUser);
    return userCreated;
  }

  public async getDetailUser(id: string) {
    const user = await this.userRepository.findUserById(id);
    return user;
  }
}
