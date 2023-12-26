import { Document, Model } from 'mongoose';

export interface ILeadEntity {
  name: String;
  lastName: string;
  email: string;
  phone: string;
  budget: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  real_estate_group_id: string;
}

export interface ILeadDocument extends ILeadEntity, Document {}

export interface ILeadModel extends Model<ILeadDocument> {
  build(attr: ILeadEntity): ILeadDocument;
}
