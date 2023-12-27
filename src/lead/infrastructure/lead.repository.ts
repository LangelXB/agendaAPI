import { PipelineStage, ProjectionType } from 'mongoose';
import { ILeadDocument, ILeadEntity } from '../domain/lead.Entity';
import { ILeadRepository, IOptionsPagination, IResponsePagination } from '../domain/lead.interface';
import Lead from './lead.Model';

export default class LeadRepository implements ILeadRepository {
  createLead(lead: ILeadEntity): Promise<ILeadEntity | null> {
    const newLead = new Lead(lead);
    return newLead.save();
  }

  async listLead(options: IOptionsPagination): Promise<IResponsePagination> {
    const project: ProjectionType<ILeadDocument> = {
      real_estate_group_id: 1,
      contact_lead_name: 1,
      budget: 1,
      createdAt: 1,
    };
    const leadList = await Lead.find({ real_estate_group_id: options.tenantId }, project)
      .limit(options.limit)
      .skip(options.page * options.limit);
    const result: IResponsePagination = {
      total: await this.countLeadsByInmo(options.tenantId),
      page: options.page + 1,
      limit: options.limit,
      data: leadList,
    };
    return Promise.resolve(result);
  }

  findLeadById(id: string): Promise<ILeadEntity | null> {
    const lead = Lead.findById(id);
    console.log(lead);
    return lead;
  }

  countAllLead(group: boolean): Promise<number | any[]> {
    if (group) {
      const pipeline: PipelineStage[] = [
        { $project: { real_estate_group_id: 1 } },
        {
          $group: {
            _id: '$real_estate_group_id',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ];
      return Lead.aggregate(pipeline);
    }
    return Lead.estimatedDocumentCount();
  }

  countLeadsByInmo(id: string): Promise<number> {
    try {
      const total = Lead.countDocuments({ real_estate_group_id: id });
      return total;
    } catch (error) {
      console.log(error);
      return Promise.resolve(0);
    }
  }
}
