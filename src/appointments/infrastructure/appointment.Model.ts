import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import appointmentEntity from '../domain/appointment.Entity';
import User from '../../user/infrastructure/user.Model';
import Service from '../../services/infrastructure/service.Model';
import Bussiness from '../../bussiness/infrastructure/bussiness.Model';

@Entity()
export default class Appointment extends BaseEntity implements appointmentEntity {
  @PrimaryGeneratedColumn()
  IdAppoinment: number;

  @Column()
  DateAppointment: Date;

  @Column()
  statusPayment: Boolean;

  @ManyToOne(() => User, (user) => user.appointment)
  @JoinTable()
  user: User;

  @ManyToOne(() => Service, (service) => service.appointment)
  @JoinTable()
  service: Service;

  @ManyToOne(() => Bussiness, (bussiness) => bussiness.appointment)
  @JoinTable()
  bussiness: Bussiness;
}
