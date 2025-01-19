import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return;

    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
