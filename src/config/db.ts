import { DataSource } from 'typeorm';
import config from './config';
import User from '../user/infrastructure/user.Model';
import Appointment from '../appointments/infrastructure/appointment.Model';
import profesionalist from '../appointments/infrastructure/profesionalist.Model';
import Bussiness from '../bussiness/infrastructure/bussiness.Model';
import category from '../bussiness/infrastructure/category.Model';
import service from '../services/infrastructure/service.Model';
import payment from '../services/infrastructure/payment.Model';

const appDataSource = new DataSource({
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [User, service, payment, category, Bussiness, profesionalist, Appointment],
  logging: true,
  synchronize: true,
});

export default appDataSource;
