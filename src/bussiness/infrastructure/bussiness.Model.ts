import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BussinessEntity } from '../domain/bussiness.Entity';
import Category from './category.Model';

@Entity()
export default class Bussiness extends BaseEntity implements BussinessEntity {
  @PrimaryGeneratedColumn()
  IdBussiness: number;

  @Column()
  NameB: string;

  @Column()
  PhoneB: string;

  @Column()
  MailB: string;

  @ManyToOne(() => Category, (category) => category.bussinesses)
  category: Category;
}
