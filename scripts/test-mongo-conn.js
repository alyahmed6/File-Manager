require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
console.log('Testing MongoDB connection...');
if (!uri) {
  console.error('MONGODB_URI not set in environment');
  process.exit(2);
}
console.log('Using MONGODB_URI from .env (hidden)');
mongoose
  .connect(uri, { bufferCommands: false })
  .then(() => {
    console.log('MongoDB connected successfully');
    return mongoose.disconnect();
  })
  .catch((err) => {
    console.error('MongoDB connection error:');
    console.error(err);
    process.exit(1);
  });
