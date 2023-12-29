import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import LeadUseCase from '../application/leadUseCase';
import { ILeadEntity } from '../domain/lead.Entity';
import { IDataComertialReport, IOptionsPagination, IfilterReport } from '../domain/lead.interface';

interface ICounters {
  allActive: number;
  allDiscarded: number;
}
interface IAllPhase extends ICounters {
  phase: string;
}

interface IResumeReportComertial extends ICounters {
  tof: ICounters;
  mof: ICounters;
  bof: ICounters;
  allByPhases: IAllPhase[];
}

export default class LeadController {
  constructor(private readonly leadUseCase: LeadUseCase) {}

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
      allByPhases: [],
    };
    report.forEach((contact) => {
      const { data } = contact;
      data.forEach((phase) => {
        const { tracking_phase: trackingPhase, discardedInPhase, activeInPhase } = phase;
        if (['assigned', 'to-contact'].includes(trackingPhase)) {
          result.tof.allActive += activeInPhase;
          result.tof.allDiscarded += discardedInPhase;
        }
        if (['searching', 'tracking', 'scheduled-tour', 'finished-tour'].includes(trackingPhase)) {
          result.mof.allActive += activeInPhase;
          result.mof.allDiscarded += discardedInPhase;
        }
        if (['offer', 'downpayment', 'contract', 'closing-trade'].includes(trackingPhase)) {
          result.bof.allActive += activeInPhase;
          result.bof.allDiscarded += discardedInPhase;
        }
        result.allActive += activeInPhase;
        result.allDiscarded += discardedInPhase;
        const index = result.allByPhases.findIndex((phase) => phase.phase === trackingPhase);
        if (index !== -1) {
          result.allByPhases[index].allActive += activeInPhase;
          result.allByPhases[index].allDiscarded += discardedInPhase;
        } else {
          result.allByPhases.push({ phase: trackingPhase, allActive: activeInPhase, allDiscarded: discardedInPhase });
        }
      });
    });
    return result;
  }
}
