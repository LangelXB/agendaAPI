import { Schema, model } from 'mongoose';
import { ILeadDocument, ILeadModel } from '../domain/lead.Entity';

const LeadSchema: Schema<ILeadDocument> = new Schema({
  name: { type: String, required: true },
  lastName: String,
  email: String,
  phone: String,
  budget: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
  real_estate_group_id: Schema.ObjectId,
});

const LeadModel = model<ILeadDocument, ILeadModel>('longLeads', LeadSchema, 'longLeads');

export default LeadModel;
