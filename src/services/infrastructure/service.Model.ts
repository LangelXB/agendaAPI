import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { serviceEntity } from '../domain/service.Entity';

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
}
