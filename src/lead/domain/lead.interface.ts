import { ILeadEntity } from './lead.Entity';

export interface IOptionsPagination {
  tenantId: string;
  page: number;
  limit: number;
}
export interface IResponsePagination {
  total: number;
  page: number;
  limit: number;
  data: ILeadEntity[];
}

export interface ILeadRepository {
  createLead(lead: ILeadEntity): Promise<ILeadEntity | null>;
  listLead(options: IOptionsPagination): Promise<IResponsePagination>;
  findLeadById(id: string): Promise<ILeadEntity | null>;
  countLeadsByInmo(id: string): Promise<number>;
  countAllLead(group?: boolean): Promise<number | any[]>;
  // statsByInmo(filter?: string): Promise<Object>;
}
