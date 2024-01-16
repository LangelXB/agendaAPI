import mongoose, { Aggregate, FilterQuery, PipelineStage, ProjectionType } from 'mongoose';
import { ILeadDocument, ILeadEntity } from '../domain/lead.Entity';
import {
  IDataComertialReport,
  ILeadRepository,
  IOptionsPagination,
  IResponsePagination,
  IfilterLeadsInComertialReport,
  IfilterReport,
} from '../domain/lead.interface';
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
      return Promise.resolve(0);
    }
  }

  async comertialReport(filter: IfilterReport): Promise<IDataComertialReport[]> {
    const { tenantId, zones, date } = filter;
    const match: any = {
      real_estate_group_id: new mongoose.Types.ObjectId(tenantId),
      contact_broker_id: { $exists: true },
    };
    if (date) match.created_at = { $gte: date.start, $lte: date.end };

    if (zones) {
      if (Array.isArray(zones)) {
        match.zones = { $in: zones };
      } else {
        match.zones = zones;
      }
    }
    const pipeline: PipelineStage[] = [
      {
        $match: match,
      },
      {
        $addFields: {
          tracking_phase: {
            $cond: [
              { $eq: ['$tracking_phase', ''] },
              {
                $cond: [{ $eq: ['$operation_phase', ''] }, '$phase', '$operation_phase'],
              },

              '$tracking_phase',
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            contact: '$contact_broker_id',
            tracking_phase: '$tracking_phase',
          },
          discardedInPhase: {
            $sum: {
              $cond: [
                {
                  $eq: ['$phase', 'discarded'],
                },
                1,
                0,
              ],
            },
          },
          activeInPhase: {
            $sum: {
              $cond: [
                {
                  $ne: ['$phase', 'discarded'],
                },
                1,
                0,
              ],
            },
          },
          // if not exist currency by default is mxn
          budgetMXN: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $ne: ['$currency', 'USD'],
                    },
                    {
                      $ne: ['$phase', 'discarded'],
                    },
                  ],
                },
                '$budget',
                0,
              ],
            },
          },
          // convert usd to mxn
          // https://api.exchangerate-api.com/v4/latest/Usd
          budgetUSD: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ['$currency', 'USD'],
                    },
                    {
                      $ne: ['$phase', 'discarded'],
                    },
                  ],
                },
                '$budget',
                0,
              ],
            },
          },
          probability: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ['$profile', 'A'],
                    },
                    {
                      $ne: ['$phase', 'discarded'],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          inmediatez: {
            $sum: {
              $cond: [
                {
                  $lte: [
                    {
                      $divide: [
                        {
                          $subtract: ['$reviewed.date_at', '$created_at'],
                        },
                        60000, // Dividir por 60000 para convertir milisegundos a minutos
                      ],
                    },
                    5,
                  ],
                },
                0,
                1,
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: '$_id.contact',
          data: {
            $push: {
              tracking_phase: '$_id.tracking_phase',
              discardedInPhase: '$discardedInPhase',
              activeInPhase: '$activeInPhase',
              budgetMXN: '$budgetMXN',
              budgetUSD: '$budgetUSD',
              probability: '$probability',
              inmediatez: '$inmediatez',
              totalByPhase: {
                $sum: ['$activeInPhase', '$discardedInPhase'],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'contact_id',
          as: 'contact',
        },
      },
      {
        $unwind: {
          path: '$contact',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          data: 1,
          name: '$contact.name',
          role: '$contact.role',
          totalByContact: { $sum: '$data.totalByPhase' },
        },
      },
      { $sort: { totalByContac: -1 } },
    ];

    const query: Aggregate<IDataComertialReport[]> = Lead.aggregate(pipeline);
    return query;
  }

  getLeadsByContactInPhase(filter: IfilterLeadsInComertialReport): Promise<ILeadEntity[]> {
    const { contactId, phase, zones, date, status } = filter;
    const match: FilterQuery<ILeadDocument> = {
      contact_broker_id: new mongoose.Types.ObjectId(contactId),
      tracking_phase: phase,
    };
    if (date) match.created_at = { $gte: date.start, $lte: date.end };

    if (zones) {
      match.zones = zones.length > 1 ? { $in: zones } : zones;
    }
    if (status) match.phase = status;

    const project: ProjectionType<ILeadDocument> = {
      contact_lead_name: 1,
      created_at: 1,
      updated_at: 1,
      source: '$source.media.src',
      postponed: 1,
      contact_broker_id: 1,
      budget: 1,
    };
    const pipeline: PipelineStage[] = [
      {
        $match: match,
      },
      {
        $lookup: {
          from: 'source_traffics',
          localField: 'contact.source',
          foreignField: '_id',
          as: 'source',
        },
      },
      {
        $unwind: {
          path: '$source',
        },
      },
      {
        $project: project,
      },
    ];
    const query = Lead.aggregate(pipeline);

    return query;
  }
}
