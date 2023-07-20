import { DataSource } from 'typeorm';
import config from './config';
import User from '../user/infrastructure/user.Model';
import Appointment from '../appointments/infrastructure/appointment.Model';
import Rol from '../user/infrastructure/rol.Model';
import Bussiness from '../bussiness/infrastructure/bussiness.Model';
import Category from '../bussiness/infrastructure/category.Model';
import Service from '../services/infrastructure/service.Model';
import Payment from '../services/infrastructure/payment.Model';

const appDataSource = new DataSource({
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [User, Service, Payment, Category, Bussiness, Rol, Appointment],
  logging: true,
  // synchronize: true,
});

export default appDataSource;
