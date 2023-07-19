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
import Profesionalist from '../../appointments/infrastructure/profesionalist.Model';
import Service from '../../services/infrastructure/service.Model';

@Entity()
export default class Bussiness extends BaseEntity implements BussinessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  NameB: string;

  @Column()
  PhoneB: string;

  @Column()
  MailB: string;

  @ManyToOne(() => Category, (category) => category.bussinesses)
  category: Category;

  @OneToOne(() => Profesionalist) // Especifica la entidad relacionada
  @JoinColumn()
  profesionalist: Profesionalist;

  @ManyToMany(() => Service, (service) => service.bussines)
  @JoinTable()
  services: Service[];
}
