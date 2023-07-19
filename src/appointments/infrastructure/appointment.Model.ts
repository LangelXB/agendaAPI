import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { appointmentInterface } from '../domain/appointment.entity';
import User from '../../user/infrastructure/user.Model';
import Profesionalist from './profesionalist.Model';

@Entity()
export default class Appointment extends BaseEntity implements appointmentInterface {
  @PrimaryGeneratedColumn()
  IdAppointment: number;

  @Column()
  Date: Date;

  @ManyToOne(() => User, (user) => user.appointment)
  user: User;

  @ManyToOne(() => Profesionalist, (profesionalist) => profesionalist.appointment)
  profesionalist: Profesionalist;
}
