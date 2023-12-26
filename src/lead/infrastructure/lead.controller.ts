import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import LeadUseCase from '../application/leadUseCase';
import { ILeadEntity } from '../domain/lead.Entity';

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
    const leads = await this.leadUseCase.listLead();
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
}
