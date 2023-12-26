import 'reflect-metadata';
import 'dotenv/config';
import app from './config/app';
import appDataSource from './config/db';
import config from './config/config';
import connectMongo from './config/connectMongo';

async function main() {
  try {
    await appDataSource.initialize();
    await connectMongo();
    console.log(`🟢 DB Conected Success`);
    app.listen(config.PORT, () => {
      console.log(`🚀 [API]: Running in 🏁🏁🏁 http://localhost:${config.PORT} 🏁🏁🏁 ✔`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
