import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { UserEntity } from '../domain/user.Entity';
import Appointment from '../../appointments/infrastructure/appointment.Model';

@Entity()
export default class User extends BaseEntity implements UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  phoneUser: string;

  @Column()
  emailUser: string;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  @JoinTable()
  appointment: Appointment[];
}
