import { ILeadEntity } from './lead.Entity';

export interface ILeadRepository {
  createLead(lead: ILeadEntity): Promise<ILeadEntity | null>;
  listLead(): Promise<ILeadEntity[]>;
  findLeadById(id: string): Promise<ILeadEntity | null>;
  countLeadsByInmo(id: string): Promise<number>;
  countAllLead(group?: boolean): Promise<number | any[]>;
  // statsByInmo(filter?: string): Promise<Object>;
}
