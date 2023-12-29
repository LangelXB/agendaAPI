import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import LeadUseCase from '../application/leadUseCase';
import { ILeadEntity } from '../domain/lead.Entity';
import { IOptionsPagination, IfilterReport } from '../domain/lead.interface';

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
    return res.json(result);
  };
}
