import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI environment variable is not defined.');
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error conectando MongoDB', err);
    throw err;
  }
};

export default connectDB;
