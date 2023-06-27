import 'reflect-metadata';
import app from './app';
import appDataSource from './db/index.db';

async function main() {
  try {
    await appDataSource.initialize();
    app.listen(3000, () => {
      console.log(`🚀 [API]: Running in 🏁🏁🏁 http://localhost:3000 🏁🏁🏁 ✔`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
