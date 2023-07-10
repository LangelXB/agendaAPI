import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import appDataSource from './db/index.db';
import config from './config';

async function main() {
  try {
    await appDataSource.initialize();
    console.log(`🟢 DB Conected`);
    app.listen(config.PORT, () => {
      console.log(`🚀 [API]: Running in 🏁🏁🏁 http://localhost:${config.PORT} 🏁🏁🏁 ✔`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
