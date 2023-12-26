import { PipelineStage } from 'mongoose';
import { ILeadEntity } from '../domain/lead.Entity';
import { ILeadRepository } from '../domain/lead.interface';
import Lead from './lead.model';

export default class LeadRepository implements ILeadRepository {
  createLead(lead: ILeadEntity): Promise<ILeadEntity | null> {
    const newLead = new Lead(lead);
    return newLead.save();
  }

  listLead(): Promise<ILeadEntity[]> {
    const leadList = Lead.find();
    return leadList;
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
