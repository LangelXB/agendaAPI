import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../domain/user.Entity';

@Entity()
export default class User extends BaseEntity implements UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;
}
