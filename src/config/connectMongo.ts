import { connect } from 'mongoose';

const connectMongo = async (): Promise<void> => {
  const uri = process.env.MONGO_URI ?? '';
  await connect(uri);

  console.log('🟢 MongoDB connected');
};

export default connectMongo;
