import mongoose from 'mongoose';
import { config } from './config';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('Połączono z bazą danych!');
  } catch (error) {
    console.error('Błąd połączenia z bazą danych:', error);
    process.exit(1);
  }
};