import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinTable } from 'typeorm';
import { profesionalistEntity } from '../domain/profesionalist.entity';
import Bussiness from '../../bussiness/infrastructure/bussiness.Model';
import Appointment from './appointment.Model';

@Entity()
export default class profesionalist extends BaseEntity implements profesionalistEntity {
  @PrimaryGeneratedColumn()
  IdProfessionalist: number;

  @Column()
  ProfName: string;

  @OneToOne(() => Bussiness, (bussiness) => bussiness.profesionalist) // Especifica la entidad y la relación inversa
  bussiness: Bussiness;

  @OneToMany(() => Appointment, (appointment) => appointment.profesionalist)
  @JoinTable()
  appointment: Appointment[];
}
