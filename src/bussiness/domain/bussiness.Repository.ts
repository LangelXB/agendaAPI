import { BussinessEntity } from './bussiness.Entity';

export interface bussinessRepositoryInterface {
  FindBussinessById(id: number): Promise<BussinessEntity | null>;
  RegisterBussiness(bussiness: BussinessEntity): Promise<BussinessEntity | null>;
  FindBussinessByCategory(category: BussinessEntity): Promise<BussinessEntity | null>;
  ListBussiness(): Promise<BussinessEntity[]>;
}
