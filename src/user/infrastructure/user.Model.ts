import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../domain/user.Entity';

@Entity()
export default class User extends BaseEntity implements UserEntity {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  fullName: string;

  @Column()
  phoneUser: string;

  @Column()
  emailUser: string;
}
