import { Document, Model } from 'mongoose';

export interface Comment {
  text: string;
  created_at: Date;
  comment_id: string;
  image_src?: string;
  audio_src?: string;
  contact_broker_id: string;
}

export interface Contact {
  how_did_contact_us: string;
  medium: string;
  source: string;
}

export interface Postponed {
  is_postponed: boolean;
  date_at: Date;
}

export interface Reviewed {
  is_reviewed: boolean | null;
  date_at: Date;
}

export interface AssignedAt {
  is_assigned: boolean;
  date_at: Date;
}

export interface ILeadEntity extends Document {
  contact_lead_name: string;
  contact_broker_id: string;
  profile: string;
  budget: string;
  currency: string;
  payment_method: string;
  target_action: string;
  property_type: string[];
  zones: string;
  phase: string;
  tracking_phase: string;
  contact: Contact;
  crm_link: string;
  observations: string;
  contact_lead_id: string;
  updated_at: Date;
  postponed: Postponed;
  status: number;
  created_at: Date;
  reviewed: Reviewed;
  operation_phase: string;
  real_estate_group_id: string;
  reassigned: string;
  profile_percentage: number;
  comments: Comment[];
  registration: string;
  assigned_at: AssignedAt;
}

export interface ILeadDocument extends ILeadEntity, Document {}

export interface ILeadModel extends Model<ILeadDocument> {
  build(attr: ILeadEntity): ILeadDocument;
}
