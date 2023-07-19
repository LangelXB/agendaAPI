import { DataSource } from 'typeorm';
import config from './config';
import User from '../user/infrastructure/user.Model';
import Bussiness from '../bussiness/infrastructure/bussiness.Model';
import category from '../bussiness/infrastructure/category.Model';

const appDataSource = new DataSource({
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [User, category, Bussiness],
  // logging: true,
  synchronize: true,
});

export default appDataSource;
