import { ILeadEntity } from '../domain/lead.Entity';
import {
  ILeadRepository,
  IOptionsPagination,
  IResponsePagination,
  IfilterLeadsInComertialReport,
  IfilterReport,
} from '../domain/lead.interface';

export default class LeadUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async createLead(lead: ILeadEntity): Promise<ILeadEntity | null> {
    return this.leadRepository.createLead(lead);
  }

  async listLead(options: IOptionsPagination): Promise<IResponsePagination> {
    return this.leadRepository.listLead(options);
  }

  async findLeadById(id: string): Promise<ILeadEntity | null> {
    return this.leadRepository.findLeadById(id);
  }

  async countLeads(group: boolean): Promise<number | any[]> {
    return this.leadRepository.countAllLead(group);
  }

  async countLeadsByInmo(id: string): Promise<number> {
    return this.leadRepository.countLeadsByInmo(id);
  }

  async comertialReport(filter: IfilterReport) {
    return this.leadRepository.comertialReport(filter);
  }

  async getLeadsByContactInComertialReport(filter: IfilterLeadsInComertialReport) {
    return this.leadRepository.getLeadsByContactInPhase(filter);
  }
}
