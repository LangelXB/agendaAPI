import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  logging: true,
  entities: [],
});

export default appDataSource;
