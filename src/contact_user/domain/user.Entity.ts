import { Document, Model } from 'mongoose';

export interface IContactLeadEntity {
  status?: number;
  duplicated?: boolean;
  name: string;
  email: string;
  phone: string;
  location?: string;
  real_estate_group_id: string;
  created_at: Date;
  updated_at?: Date;
}

export interface IContactLeadDocument extends IContactLeadEntity, Document {}

export interface IContactLeadModel extends Model<IContactLeadDocument> {
  build(attr: IContactLeadEntity): IContactLeadDocument;
}
