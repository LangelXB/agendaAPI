import { Schema, model } from 'mongoose';
import { IContactLeadDocument, IContactLeadModel } from '../domain/user.Entity';

const ContactLeadSchema: Schema<IContactLeadDocument> = new Schema({
  status: { type: Number, required: true },
  duplicated: { type: Boolean, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  location: String,
  real_estate_group_id: Schema.ObjectId,
});
const ContactLeadModel = model<IContactLeadDocument, IContactLeadModel>(
  'contact_leads',
  ContactLeadSchema,
  'contact_leads'
);

export default ContactLeadModel;
