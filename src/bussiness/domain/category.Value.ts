import { categoryEntity } from './category.Entity';

export default class categoryValue implements categoryEntity {
  IdCateogry: number;

  NameCat: string;

  DescCat: string;

  constructor(name: string, description: string) {
    this.NameCat = name;

    this.DescCat = description;
  }
}
