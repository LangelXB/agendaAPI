/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import app from './config/app';
import appDataSource from './config/db';
import config from './config/config';

async function main() {
  try {
    await appDataSource.initialize();
    console.log(`🟢 DB Conected Success`);
    app.listen(config.PORT, () => {
      console.log(`🚀 [API]: Running in 🏁🏁🏁 http://localhost:${config.PORT} 🏁🏁🏁 ✔`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
