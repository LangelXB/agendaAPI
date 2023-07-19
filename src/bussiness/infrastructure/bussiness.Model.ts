import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { BussinessEntity } from '../domain/bussiness.Entity';
import Category from './category.Model';
import profesionalist from '../../appointments/infrastructure/profesionalist.Model';
import service from '../../services/infrastructure/service.Model';

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

  @OneToOne(() => profesionalist) // Especifica la entidad relacionada
  @JoinColumn()
  profesionalist: profesionalist;

  @ManyToMany(() => service)
  @JoinTable()
  service: service;
}
