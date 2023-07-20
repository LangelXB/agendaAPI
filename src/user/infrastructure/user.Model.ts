import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../domain/user.Entity';
import Appointment from '../../appointments/infrastructure/appointment.Model';
import Rol from './rol.Model';

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

  @Column()
  password: string;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  @JoinTable()
  appointment: Appointment[];

  @OneToOne(() => Rol)
  @JoinColumn()
  rol: Rol;
}
