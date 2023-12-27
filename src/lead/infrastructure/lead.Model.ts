import { Schema, model } from 'mongoose';
import { ILeadDocument, ILeadModel, Contact, AssignedAt, Comment, Postponed, Reviewed } from '../domain/lead.Entity';

const CommentSchema = new Schema<Comment>({
  text: { type: String, required: true },
  created_at: { type: Date, required: true },
  comment_id: Schema.ObjectId,
  image_src: String,
  audio_src: String,
  contact_broker_id: Schema.ObjectId,
});

const ContactSchema = new Schema<Contact>({
  how_did_contact_us: { type: String, required: true },
  medium: Schema.ObjectId,
  source: Schema.ObjectId,
});

const PostponedSchema = new Schema<Postponed>({
  is_postponed: { type: Boolean, required: true },
  date_at: { type: Date, required: true },
});

const ReviewedSchema = new Schema<Reviewed>({
  is_reviewed: Boolean,
  date_at: { type: Date, required: true },
});

const AssignedAtSchema = new Schema<AssignedAt>({
  is_assigned: { type: Boolean, required: true },
  date_at: { type: Date, required: true },
});

const LeadSchema: Schema<ILeadDocument> = new Schema({
  contact_lead_name: { type: String, required: true },
  contact_broker_id: Schema.ObjectId,
  profile: { type: String, required: true },
  budget: { type: String, required: true },
  currency: { type: String, required: true },
  payment_method: { type: String, required: true },
  target_action: { type: String, required: true },
  property_type: { type: [String], required: true },
  zones: { type: String, required: true },
  phase: { type: String, required: true },
  tracking_phase: { type: String, required: true },
  contact: { type: ContactSchema, required: true },
  crm_link: String,
  observations: String,
  contact_lead_id: Schema.ObjectId,
  updated_at: { type: Date, required: true },
  postponed: { type: PostponedSchema, required: true },
  status: { type: Number, required: true },
  created_at: { type: Date, required: true },
  reviewed: { type: ReviewedSchema, required: true },
  operation_phase: String,
  real_estate_group_id: Schema.ObjectId,
  reassigned: { type: String, required: true },
  profile_percentage: { type: Number, required: true },
  comments: { type: [CommentSchema], required: true },
  registration: { type: String, required: true },
  assigned_at: { type: AssignedAtSchema },
});

const LeadModel = model<ILeadDocument, ILeadModel>('longLeads', LeadSchema, 'longLeads');

export default LeadModel;
