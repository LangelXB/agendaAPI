import { BussinessEntity } from './bussiness.Entity';

export default class bussinessValue implements BussinessEntity {
  IdBussiness: number;

  NameB: string;

  PhoneB: number;

  MailB: string;

  constructor(name: string, phone: number, email: string) {
    this.NameB = name;

    this.PhoneB = phone;

    this.MailB = email;
  }
}
