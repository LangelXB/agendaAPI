import { BussinessEntity } from './bussiness.Entity';

export default class bussinessValue implements BussinessEntity {
  id: number;

  NameB: string;

  PhoneB: string;

  MailB: string;

  constructor(name: string, phone: string, email: string) {
    this.NameB = name;

    this.PhoneB = phone;

    this.MailB = email;
  }
}
