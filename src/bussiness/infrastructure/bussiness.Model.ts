import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { BussinessEntity } from '../domain/bussiness.Entity';
import Category from './category.Model';
import Service from '../../services/infrastructure/service.Model';
import Appointment from '../../appointments/infrastructure/appointment.Model';

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

  @ManyToMany(() => Service, (service) => service.bussines)
  @JoinTable()
  services: Service[];

  @OneToMany(() => Appointment, (appointment) => appointment.bussiness)
  @JoinTable()
  appointment: Appointment;
}
