import { ILeadEntity } from './lead.Entity';

// export enum phasesEnum {
//   'unassigned',
//   'assigned',
//   'to-contact',
//   'searching',
//   'tracking',
//   'scheduled-tour',
//   'finished-tour',
//   'offer',
//   'downpayment',
//   'contract',
//   'closing-trade',
//   'finished',
//   'discarded',
// }

export enum statusEnum {
  'active',
  'discarded',
}
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

export interface IDataByContactInReport {
  tracking_phase: string;
  discardedInPhase: number;
  activeInPhase: number;
  budgetMXN: number;
  budgetUSD: number;
  probability: number;
  inmediatez: number;
  totalByPhase: number;
}

export interface IDataComertialReport {
  _id: string;
  data: IDataByContactInReport[];
  name: string;
  role: string;
  totalByContact: number;
}
export interface IResponseComertialReport {
  tof: number;
  mof: number;
  bof: number;
  contacts: IDataComertialReport[];
}

export interface IRangeDate {
  start: Date;
  end: Date;
}
export interface IfilterReport {
  tenantId: string;
  zones?: string | string[];
  date?: IRangeDate;
}

export interface IfilterLeadsInComertialReport {
  contactId: string;
  phase: string;
  status?: statusEnum;
  zones?: string[];
  date?: IRangeDate;
}

export interface ILeadRepository {
  createLead(lead: ILeadEntity): Promise<ILeadEntity | null>;
  listLead(options: IOptionsPagination): Promise<IResponsePagination>;
  findLeadById(id: string): Promise<ILeadEntity | null>;
  countLeadsByInmo(id: string): Promise<number>;
  countAllLead(group?: boolean): Promise<number | any[]>;
  comertialReport(filter: IfilterReport): Promise<IDataComertialReport[]>;
  getLeadsByContactInPhase(filter: IfilterLeadsInComertialReport): Promise<ILeadEntity[]>;
  // statsByInmo(filter?: string): Promise<Object>;
}
