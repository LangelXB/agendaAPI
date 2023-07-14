import 'dotenv/config';

interface envInterface {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  PORT: number;
}

const config: envInterface = {
  DB_HOST: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
  DB_NAME: process.env.DB_NAME ? process.env.DB_NAME : 'test',
  DB_PASSWORD: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'root',
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  DB_USERNAME: process.env.DB_USERNAME ? process.env.DB_USERNAME : 'root',
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
};

export default config;
