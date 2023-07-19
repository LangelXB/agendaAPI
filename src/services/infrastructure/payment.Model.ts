import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { paymentInterface } from '../domain/payment.Entity';
import Service from './service.Model';

@Entity()
export default class Payment extends BaseEntity implements paymentInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descPayment: string;

  @ManyToMany(() => Service, (service) => service.payments)
  services: Service;
}
