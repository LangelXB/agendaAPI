import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { categoryEntity } from '../domain/category.Entity';
import Bussiness from './bussiness.Model';

@Entity()
export default class Category extends BaseEntity implements categoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  NameCat: string;

  @Column()
  DescCat: string;

  @OneToMany(() => Bussiness, (bussiness) => bussiness.category)
  bussinesses: Bussiness[];
}
