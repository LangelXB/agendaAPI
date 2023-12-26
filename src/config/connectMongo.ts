import { connect } from 'mongoose';

const connectMongo = async (): Promise<void> => {
  const uri = process.env.MONGO_URI ?? '';
  //   const options: ConnectOptions = {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useFindAndModify: true,
  //   };

  await connect(uri);

  console.log('MongoDB connected 💾');
};

export default connectMongo;
