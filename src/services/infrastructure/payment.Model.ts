import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { paymentInterface } from '../domain/payment.Entity';

@Entity()
export default class payment extends BaseEntity implements paymentInterface {
  @PrimaryGeneratedColumn()
  IdPayment: number;

  @Column()
  descPayment: string;
}
