import { Router } from 'express';
import LeadRepository from './lead.repository';
import LeadUseCase from '../application/leadUseCase';
import LeadController from './lead.controller';

const leadRouter = Router();

const leadRepository = new LeadRepository();

const leadUseCase = new LeadUseCase(leadRepository);

const leadCtrl = new LeadController(leadUseCase);

leadRouter.post('/', leadCtrl.createLead);
leadRouter.get('/', leadCtrl.listLead);
leadRouter.get('/count', leadCtrl.countLeads);
leadRouter.get('/count/:id', leadCtrl.countLeadsByInmo);
leadRouter.get('/:id', leadCtrl.getLead);
leadRouter.post('/report/comertial', leadCtrl.comertialReport);
leadRouter.post('/report/comertial/leads', leadCtrl.getLeadsByContactInComertialReport);

export default leadRouter;
