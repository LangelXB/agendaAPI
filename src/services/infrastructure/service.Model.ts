import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { serviceEntity } from '../domain/service.Entity';
import Payment from './payment.Model';
import Bussiness from '../../bussiness/infrastructure/bussiness.Model';
import Appointment from '../../appointments/infrastructure/appointment.Model';

@Entity()
export default class Service extends BaseEntity implements serviceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: Date;

  @Column()
  amount: number;

  @ManyToMany(() => Payment, (payment) => payment.services)
  @JoinTable()
  payments: Payment[];

  @ManyToMany(() => Bussiness, (bussines) => bussines.services)
  bussines: Bussiness[];

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  @JoinTable()
  appointment: Appointment;
}
