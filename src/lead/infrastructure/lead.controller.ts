import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import LeadUseCase from '../application/leadUseCase';
import { ILeadEntity } from '../domain/lead.Entity';
import { IDataComertialReport, IOptionsPagination, IfilterReport } from '../domain/lead.interface';

type ValidKeys = 'tof' | 'mof' | 'bof';

interface ICounters {
  allActive: number;
  allDiscarded: number;
}
interface IAllPhase {
  [phase: string]: ICounters;
}

interface IResumeReportComertial extends ICounters {
  tof: ICounters;
  mof: ICounters;
  bof: ICounters;
  allByPhases: IAllPhase;
  allLeads: number;
}

export default class LeadController {
  constructor(private readonly leadUseCase: LeadUseCase) {}

  private phaseMap: { [key: string]: ValidKeys } = {
    assigned: 'tof',
    'to-contact': 'tof',
    searching: 'mof',
    tracking: 'mof',
    'scheduled-tour': 'mof',
    'finished-tour': 'mof',
    offer: 'bof',
    downpayment: 'bof',
    contract: 'bof',
    'closing-trade': 'bof',
  };

  createLead = async (req: Request, res: Response) => {
    const lead: ILeadEntity = req.body;
    const newLead = await this.leadUseCase.createLead(lead);
    return res.send(newLead);
  };

  getLead = async (req: Request, res: Response) => {
    const { params } = req;
    const { id } = params;
    const leads = await this.leadUseCase.findLeadById(id);
    return res.send(leads);
  };

  listLead = async (req: Request, res: Response) => {
    const options: IOptionsPagination = req.body;
    // validate options
    if (!options.tenantId) return res.status(400).json({ message: 'tenantId is required' });
    if (!options.limit) options.limit = 10;
    if (!options.page) options.page = 0;
    const leads = await this.leadUseCase.listLead(options);
    return res.send(leads);
  };

  countLeads = async (req: Request, res: Response) => {
    const { group } = req.query;
    const groupBool = group === 'true';
    const total = await this.leadUseCase.countLeads(groupBool);
    return res.json(total);
  };

  countLeadsByInmo = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Id invalido' });
    const total = await this.leadUseCase.countLeadsByInmo(id);
    return res.json(total);
  };

  comertialReport = async (req: Request, res: Response) => {
    const { tenantId, zones, date } = req.body;
    if (!tenantId) return res.status(400).json({ message: 'tenantId is required' });
    const filter: IfilterReport = { tenantId };
    if (date) {
      const { start, end } = date;
      filter.date = {
        start: new Date(start),
        end: new Date(end),
      };
    }
    if (zones) {
      if (Array.isArray(zones)) {
        filter.zones = zones as string[];
      } else {
        filter.zones = zones as string;
      }
    }
    const result = await this.leadUseCase.comertialReport(filter);
    const resume = this.resumeReportComertial(result);
    return res.json({ resume, result });
  };

  private resumeReportComertial(report: IDataComertialReport[]): IResumeReportComertial {
    const result: IResumeReportComertial = {
      tof: { allActive: 0, allDiscarded: 0 },
      mof: { allActive: 0, allDiscarded: 0 },
      bof: { allActive: 0, allDiscarded: 0 },
      allActive: 0,
      allDiscarded: 0,
      allByPhases: {},
      allLeads: 0,
    };
    report.forEach((contact) => {
      const { data } = contact;
      result.allLeads += contact.totalByContact;
      data.forEach((phase) => {
        const { tracking_phase: trackingPhase, discardedInPhase, activeInPhase } = phase;

        const phaseKey = this.phaseMap[trackingPhase];
        if (phaseKey) {
          result[phaseKey].allActive += activeInPhase;
          result[phaseKey].allDiscarded += discardedInPhase;

          result.allActive += activeInPhase;
          result.allDiscarded += discardedInPhase;
        }

        if (result.allByPhases[trackingPhase]) {
          result.allByPhases[trackingPhase].allActive += activeInPhase;
          result.allByPhases[trackingPhase].allDiscarded += discardedInPhase;
        } else {
          result.allByPhases[trackingPhase] = {
            allActive: activeInPhase,
            allDiscarded: discardedInPhase,
          };
        }
      });
    });
    return result;
  }
}
