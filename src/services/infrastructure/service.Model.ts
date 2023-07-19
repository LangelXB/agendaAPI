import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { serviceEntity } from '../domain/service.Entity';
import payment from './payment.Model';

@Entity()
export default class service extends BaseEntity implements serviceEntity {
  @PrimaryGeneratedColumn()
  IdService: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: Date;

  @Column()
  amount: number;

  @ManyToMany(() => payment)
  @JoinTable()
  payment: payment;
}
