import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { rolEntity } from '../domain/rol.Entity';

@Entity()
export default class Rol extends BaseEntity implements rolEntity {
  @PrimaryGeneratedColumn()
  IdRol: number;

  @Column()
  NameRol: String;
}
