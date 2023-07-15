import mongoose from 'mongoose';
import { MONGODB_URI } from './config.js';
export const dbConnect = async () => {
   try {
      await mongoose.connect(MONGODB_URI);
      console.log('Db connect');
   } catch (error) {
      console.log(error.message);
   }
};
