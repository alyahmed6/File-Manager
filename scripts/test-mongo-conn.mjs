import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const uri = process.env.MONGODB_URI;
console.log('Testing MongoDB connection...');
if (!uri) {
  console.error('MONGODB_URI not set in environment');
  process.exit(2);
}
console.log('Using MONGODB_URI from .env (hidden)');

try {
  await mongoose.connect(uri, { bufferCommands: false });
  console.log('MongoDB connected successfully');
  await mongoose.disconnect();
} catch (err) {
  console.error('MongoDB connection error:');
  console.error(err);
  process.exit(1);
}
