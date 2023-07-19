import { categoryEntity } from './category.Entity';

export default interface categoryRepositoryInterface {
  FindCategoryById(id: number): Promise<categoryEntity | null>;
  ListCategory(): Promise<categoryEntity[]>;
}
